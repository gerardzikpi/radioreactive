import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { fetchPosts, deletePost as apiDeletePost } from "../api/posts"

export default function Blog() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function loadPosts() {
        setLoading(true)
        setError(null)
        try {
            const data = await fetchPosts()
            // data is expected to be an array of posts
            setPosts(Array.isArray(data) ? data : data.results || [])
        } catch (err) {
            setError(err?.message || 'Failed to load posts')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPosts()
    }, [])

    async function handleDelete(id) {
        if (!confirm('Delete this post?')) return
        try {
            await apiDeletePost(id)
            // refresh list
            await loadPosts()
        } catch (err) {
            alert('Failed to delete post: ' + (err?.message || 'unknown'))
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <h1 className="text-3xl font-bold">Posts</h1>

                {loading && <div>Loading posts…</div>}
                {error && <div className="text-danger">{error}</div>}

                {!loading && !error && (
                    <ul className="list-group">
                        {posts.map((p) => (
                            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 className="mb-1">{p.heading}</h5>
                                    <p className="mb-1">{p.content}</p>
                                    <small>By: {p.author?.username || p.author}</small>
                                </div>

                                <div className="btn-group">
                                    <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                                    <button className="btn btn-primary" onClick={() => navigate(`/update/${p.id}`)}>Update</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}