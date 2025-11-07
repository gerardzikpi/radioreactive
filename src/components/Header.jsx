import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosClient, { getAccessToken, clearAuthTokens } from "../api/axiosClient"
import NewPost from "../pages/NewPost"


export default function Header(){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            setLoading(true)
            const token = getAccessToken()
            if (!token) {
                setUser(null)
                setLoading(false)
                return
            }

            try {
                // Try to fetch the current user's profile. The backend may return
                // either a single object or an array; handle both safely.
                const resp = await axiosClient.get("user/")
                const data = resp.data
                if (!data) {
                    setUser(null)
                } else if (Array.isArray(data)) {
                    // If a list is returned, try to find the logged-in user by username
                    // (best-effort). If none found, fall back to first entry.
                    setUser(data[0] || null)
                } else {
                    setUser(data)
                }
            } catch (err) {
                // If unauthorized or any error, treat as not signed in
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])
    return(
        <header>
            <div className="d-flex flex-inline gap-6 bg-primary pt-3 px-3">
                <div className="text-4xl font-bold text-white justify-start">
                    Radioreactive
                </div>
                <div className="d-flex  gap-1 fs-1 align-items-xl-end justify-content-xl-end flex-grow-1">
                    <Link to="/createpost"><p className='rounded-pill bg-white text-decoration-none'><i className="bi bi-plus"/>Create Post</p></Link>

                    {!loading && !user && (
                        // Anonymous user: prompt to sign in
                        <Link to="/signin" className="btn btn-outline-light">Sign in</Link>
                    )}

                    {user && (
                        <div className="text-primary rounded-full d-flex align-items-center gap-2 mb-4">
                            <div className='text-large'>{user.username || user.name || user.email}</div>
                            <div className='rounded rounded-full' style={{ width: 40, height: 40 }}>
                                {(() => {
                                    const imageUrl = user.profilephoto || user.image || user.profile_photo || user.photo || null
                                    if (imageUrl) {
                                        return <img src={imageUrl} alt="Profile" style={{ borderRadius: "50%", width: "40px", height: "40px", objectFit: 'cover' }} />
                                    }
                                    return <i className="bi bi-person-circle text-white" style={{ fontSize: 36 }} />
                                })()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}