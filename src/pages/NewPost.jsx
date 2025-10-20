import axios, { Axios } from "axios"
import { useEffect } from "react"


export default function NewPost(){
    function handleSubmit(e){
        e.PreventDefault();
        const response = axios.post('https://127.0.0.1:8000/api/post',{
            title,
            body,
        })
    }
    return (
        <>
            <form className="container container-sm d-flex flex-column justify-center gap-3 rounded-top p-3 shadow-lg w-50 " onSubmit={handleSubmit}>
                <label>Title</label>
                    <input type="text"className="border border-2 border-black" />
                <label>Content</label>
                    <input type="text"/>
                <select>
                    <option>Draft</option>
                    <option>Published</option>
                </select>
            </form>
            <button type="submit">Create</button>
        </>
    )
}