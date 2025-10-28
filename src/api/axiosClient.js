import axios from 'axios'

// Base URL can be configured in Vite with VITE_API_BASE_URL (e.g. http://localhost:8000/api/)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/'

const axiosClient = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	withCredentials: true, // send cookies for session auth (Django) if needed
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': 'Bearer ${}',
	},
})

// Token helpers: store access and refresh tokens
export function setAuthTokens({ access, refresh }) {
	try {
		if (access) localStorage.setItem('access_token', access)
		if (refresh) localStorage.setItem('refresh_token', refresh)
	} catch (e) {}
}

export function clearAuthTokens() {
	try {
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
	} catch (e) {}
}

export function getAccessToken() {
	try {
		return localStorage.getItem('access_token')
	} catch (e) {
		return null
	}
}

export function getRefreshToken() {
	try {
		return localStorage.getItem('refresh_token')
	} catch (e) {
		return null
	}
}

// Small axios instance to call token refresh (no interceptors)
const authAxios = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
})

// Attach Authorization header from stored access token
axiosClient.interceptors.request.use(
	(config) => {
		try {
			const token = getAccessToken()
			if (token) config.headers.Authorization = `Bearer ${token}`
		} catch (e) {}
		return config
	},
	(error) => Promise.reject(error)
)

// Response interceptor: try to refresh access token on 401 and retry the request once
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error)
		else prom.resolve(token)
	})
	failedQueue = []
}

axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			if (isRefreshing) {
				// wait for refresh to finish
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then((token) => {
						originalRequest.headers.Authorization = 'Bearer ' + token
						return axiosClient(originalRequest)
					})
					.catch((err) => Promise.reject(err))
			}

			isRefreshing = true
			const refreshToken = getRefreshToken()

			if (!refreshToken) {
				clearAuthTokens()
				isRefreshing = false
				return Promise.reject(error)
			}

			try {
				const resp = await authAxios.post('token/refresh/', { refresh: refreshToken })
				const newAccess = resp?.data?.access
				if (newAccess) {
					setAuthTokens({ access: newAccess })
					axiosClient.defaults.headers.common.Authorization = 'Bearer ' + newAccess
					processQueue(null, newAccess)
					originalRequest.headers.Authorization = 'Bearer ' + newAccess
					return axiosClient(originalRequest)
				}
			} catch (err) {
				processQueue(err, null)
				clearAuthTokens()
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)

export default axiosClient

