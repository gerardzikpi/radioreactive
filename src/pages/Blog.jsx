import { useParams } from "react-router-dom";
import axios from "axios"
import Button from "../components/Button";
import Header from "../components/Header";  
import posts from "../api/posts.js"

export default function Blog(){
    const {id} = useParams();
    
    function renderPosts(){
        return posts.fetchPosts
    }

    function blogPostDetail(){
        return posts.fetchPost(id)
    }

    function deletePost(){
        return posts.deletePost(id)
    }

    function updatePost(){
        return posts.updatePost(id)
    }
    return(
        <>
        <Header/>
        <h1 className="text-3xl font-bold  " >
            Posts
        </h1>
        
        <div onClick={blogPostDetail}>
            <ul className="list-group">
                <li className="list-group-item">
                    <button className="btn btn-danger float-end" onClick={deletePost}>Delete Post</button>
                    <button className="btn btn-primary float-end me-2" onClick={updatePost}>Update Post</button>
                </li>
            </ul>
        </div>
        </>
    )
}