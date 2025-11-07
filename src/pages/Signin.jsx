import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosClient, { setAuthTokens } from "../api/axiosClient"

// Signin component — controlled inputs, loading/error states, and API call.
// This project exposes JWT endpoints at /api/token/ and /api/token/refresh/ (SimpleJWT).
// axiosClient has baseURL '/api/' so we call the relative 'token/' path.
const AUTH_ENDPOINT = "token/" // POST { username, password } -> { access, refresh }

export default function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const resp = await axiosClient.post(AUTH_ENDPOINT, {
                username,
                password,
            })

            const access = resp?.data?.access || null
            const refresh = resp?.data?.refresh || null
            if (access && refresh) {
                // If user selected 'remember', keep tokens; otherwise still stored but
                // you can later choose to clear them on window close.
                setAuthTokens({ access, refresh })
                navigate('/')
                return
            }

            if (resp.status === 200) {
                navigate('/')
                return
            }

            setError('Sign-in failed: unexpected response from server.')
        } catch (err) {
            const msg =
                err?.response?.data?.detail ||
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                'Failed to sign in. Check credentials and try again.'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <div className="card shadow-sm" style={{ width: 360 }}>
                <div className="card-body">
                    <h4 className="card-title mb-3">Sign in</h4>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3 form-check d-flex justify-content-between align-items-center">
                            <div>
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <label htmlFor="remember" className="form-check-label">Remember me</label>
                            </div>
                            <div>
                                <a href="/signup" className="small">Create account</a>
                            </div>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Signing in…' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}