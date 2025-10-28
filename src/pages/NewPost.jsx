import axiosClient from "../api/axiosClient";
import { useEffect } from "react"


export default function NewPost(){
    function handleSubmit(e){
        e.PreventDefault();
        const response = axios.post('localhost:8000/api/posts',{
            title,
            body,
        })
    }
    return (
        <>
            <form className="container container-sm d-flex flex-column justify-center gap-3 rounded-top mt-4 mb-4 p-3 shadow-lg w-50 rounded rounded-xl" onSubmit={handleSubmit}>
                <label>Title</label>
                    <input type="text"className="border border-2 border-black" />
                <label>Content</label>
                    <input type="text"/>
                <select>
                    <option>Draft</option>
                    <option>Published</option>
                </select>
                 <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create</button>
            </form>
           
        </>
    )
}