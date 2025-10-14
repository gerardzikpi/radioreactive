import {useState} from 'react';


export default function Button({ label, onClick }) {
    const [count,setCount]=useState(0);
    return (
    <button className='btn btn-success'onClick={() => setCount((count) => count + 1)}>
        count is {count}
    </button>
    );
}