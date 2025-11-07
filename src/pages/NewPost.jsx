import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import React, { useState } from "react";
import { getAccessToken } from "../api/axiosClient"


export default function NewPost(){
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        const token = getAccessToken()
        if (!token) {
            alert('You must be signed in to create a post.')
            return
        }

        const heading = e.target.heading.value.trim();
        const content = e.target.content.value.trim();
        const status = e.target.status.value;

        if(!title || !content){
            alert('Title and content are required.');
            return;
        }

        try{
            const payload = {
                heading,
                content,
                status
            };
            const response = await createPost(payload)

            // axios response
            if (response && response.status && (response.status === 201 || response.status === 200)) {
                alert('Post created successfully!')
                navigate('/blog')
                return
            }

            // axios error-like object
            let errMsg = ''
            if (response && response.data) {
                if (typeof response.data === 'string'){
                     errMsg = response.data
                }
                else if (response.data.detail){
                     errMsg = response.data.detail
                }
                else if (response.data.message){
                     errMsg = response.data.message
                }
                else errMsg = JSON.stringify(response.data)
            }

            alert('Failed to create post: ' + (errMsg || 'unknown'))

        }
        catch(err){
            alert('Failed to create post: ' + (err?.message || 'unknown'))
        }

    }
    return (
        <>
            <form className="container container-sm d-flex flex-column justify-center gap-3 rounded-top mt-4 mb-4 p-3 shadow-lg w-50 rounded rounded-xl" onSubmit={handleSubmit}>
                <label>Heading</label>
                    <input name="title" type="text" className="border border-2 border-black rounded-md" value={handleSubmit.payload} />
                <label>Content</label>
                    <input name="content" type="textarea" className="border border-3 border-blue rounded-md" value={handleSubmit.payload}/>
                <select name="status"  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                 <button type="submit" className="btn btn-primary" >Create</button>
            </form>
        </>
    )
}

// src/components/BlogPostForm.js


// const BlogPostForm = () => {
//   const [formData, setFormData] = useState({
//     heading: "",
//     content: "",
//     status: "draft",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value.trim(), // sanitize input
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.post("/posts/", formData);
//       console.log("Blog post created:", response.data);
//     } catch (error) {
//       console.error("Error creating post:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="heading"
//         value={formData.heading}
//         onChange={handleChange}
//         placeholder="Post Title"
//       />
//       <textarea
//         name="content"
//         value={formData.content}
//         onChange={handleChange}
//         placeholder="Write your content..."
//       />
//       <select name="status" value={formData.status} onChange={handleChange}>
//         <option value="draft">Draft</option>
//         <option value="published">Published</option>
//       </select>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default BlogPostForm;