import {useEffect} from "react"
import { useState } from "react"

export default function Signin(){
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [error, setError] = useState('');

    const handleSubmit= (e) =>{
        e.preventDefault();
    }

    return(
        <form className="col-2 container container-lg rounded-full bg-gradient">
            <label>Username:</label>
            <input type="text" />
            <label>Password:</label>
            <input type='password'/>
            <input type='submit' placeholder="Sign In" className='btn btn-outline-success align-items-end' />
        </form>
    )
}