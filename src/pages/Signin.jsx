import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosClient, { setAuthToken } from "../api/axiosClient"

// Signin component — controlled inputs, loading/error states, and API call.
// This project exposes a token endpoint at /api/token-auth/ (DRF authtoken).
// axiosClient has baseURL '/api/' so we call the relative 'token-auth/' path.
const AUTH_ENDPOINT = "token-auth/" // POST { username, password } -> { token }

export default function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            // Example: token-based auth. Replace with your backend's expected payload and endpoint.
            const resp = await axiosClient.post(AUTH_ENDPOINT, {
                username,
                password,
            })

            // Backend may return { token } or { access, refresh } or nothing (session auth).
            const token = resp?.data?.token || resp?.data?.access || null
            if (token) {
                setAuthToken(token)
                navigate("/")
                return
            }

            // If session-based login (cookies), a 200 likely means success.
            if (resp.status === 200) {
                navigate("/")
                return
            }

            setError("Sign-in failed: unexpected response from server.")
        } catch (err) {
            const msg =
                err?.response?.data?.detail ||
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                "Failed to sign in. Check credentials and try again."
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            className="col-2 container container-lg rounded-full bg-gradient"
            onSubmit={handleSubmit}
        >
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <label htmlFor="password">Password:</label>
            <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && <div className="text-danger">{error}</div>}

            <button type="submit" className="btn btn-outline-success" disabled={loading}>
                {loading ? "Signing in…" : "Sign In"}
            </button>
        </form>
    )
}