import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

export default function Header(){
    const [user, setUser] = useState(null);
    useEffect(() => {
    // fetch user info
    fetch('http://127.0.0.1:8000/api/user')
        .then((res) => res.json())
        .then((data) => {
            setUser(data);
        })
        .catch((error) => {
            setUser(null);
        });
}, []);
    return(
        <header>
            <div className="d-flex flex-inline gap-6 bg-primary pt-3 px-3">
                <div className="text-4xl font-bold text-white justify-start">
                    Personal Blog
                </div>
                <div className="d-flex  gap-1 fs-1 justify-content-end  ">
                    <p className='rounded-pill bg-white'><i className="bi bi-plus"/>Create Post</p>
                    <p>Profile</p>
                    {user && (
                        <div className="text-primary rounded-full">
                            <div className='text-large'>{user.name}</div>
                            <div className='rounded-full'>
                               {null? <i className="bi bi-person bg-secondary"/> : <img src={user.image} alt="Profile" style={{ borderRadius: "50%", width: "40px", height: "40px" }} />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}