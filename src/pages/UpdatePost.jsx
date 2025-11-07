import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchPost, updatePost } from "../api/posts"

export default function Update() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [heading, setHeading] = useState("")
    const [content, setContent] = useState("")
    const [status, setStatus] = useState("draft")
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return
        setLoading(true)
        setError(null)
        fetchPost(id)
            .then((data) => {
                // data shape: { heading, content, status }
                setHeading(data.heading || "")
                setContent(data.content || "")
                setStatus(data.status || "draft")
            })
            .catch((err) => setError(err?.message || "Failed to load post"))
            .finally(() => setLoading(false))
    }, [id])

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setSaving(true)
        try {
            const payload = {
                heading,
                content,
                status,
            }

            const resp = await updatePost(id, payload)
            // On success navigate to posts list or detail page
            navigate("/")
        } catch (err) {
            setError(err?.response?.data || err?.message || "Failed to update post")
        } finally {
            setSaving(false)
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-3">Update Post</h1>
            <div className="container container-xl rounded-xl justify-content-xl-center shadow-sm p-4">
                {loading ? (
                    <div>Loading post…</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="alert alert-danger">{typeof error === 'string' ? error : JSON.stringify(error)}</div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea
                                className="form-control"
                                rows="10"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                {saving ? "Saving…" : "Update Post"}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}