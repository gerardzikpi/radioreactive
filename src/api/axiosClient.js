import axios from 'axios'

// Base URL can be configured in Vite with VITE_API_BASE_URL (e.g. http://localhost:8000/api/)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/'

const axiosClient = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	withCredentials: true, // send cookies for session auth (Django)
	headers: {
		'Content-Type': 'application/json',
	},
})

// Helper to read a cookie (for Django CSRF token)
function getCookie(name) {
	if (typeof document === 'undefined') return null
	const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '=([^;]*)'))
	return match ? decodeURIComponent(match[2]) : null
}

// Attach Authorization header if token exists, and CSRF header for non-GET requests
axiosClient.interceptors.request.use(
	(config) => {
		try {
			const token = localStorage.getItem('token')
			if (token) config.headers.Authorization = `Bearer ${token}`

			// For unsafe methods, attach CSRF token expected by Django
			if (config.method && !/^get$/i.test(config.method)) {
				const csrftoken = getCookie('csrftoken')
				if (csrftoken) config.headers['X-CSRFToken'] = csrftoken
			}
		} catch (e) {
			// running in non-browser environment or localStorage not available
		}

		return config
	},
	(error) => Promise.reject(error)
)

// Basic response interceptor to handle 401 globally (clear token)
axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error && error.response && error.response.status === 401) {
			try {
				localStorage.removeItem('token')
			} catch (e) {}
			// optional: navigate to sign-in page here if you want
		}
		return Promise.reject(error)
	}
)

export function setAuthToken(token) {
	if (token) localStorage.setItem('token', token)
	else localStorage.removeItem('token')
}

export function clearAuthToken() {
	localStorage.removeItem('token')
}

export default axiosClient
