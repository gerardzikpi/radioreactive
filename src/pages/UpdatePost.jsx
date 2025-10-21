export default function Update() {
    return (
        <>
            <h1>Update Post</h1>
            <div className="container container-xl rounded-xl justify-content-xl-center shadow-xl">
                <form>
                    <label>Title</label>
                    <input type="text" className="form-control" />
                    <label>Content</label>
                    <textarea className="form-control" rows="10"></textarea>
                    <button type="submit" className="btn btn-primary mt-3">Update Post</button>
                </form>
            </div>
        </>
    )
}