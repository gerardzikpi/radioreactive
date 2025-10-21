import { deletePost } from "../api/posts"

export default function DeletePost(){
    return(
        <>
            <h1>Delete Post</h1>
            <div className="container container-xl rounded-xl justify-content-xl-center shadow-xl">
                <form>
                    <label>Are you sure you want to delete this post?</label>
                    <button type="submit" className="btn btn-danger mt-3" onClick={deletePost}>Delete Post</button>
                </form>
            </div>
        </>
    )
}