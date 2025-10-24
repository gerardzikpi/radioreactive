import {useEffect} from 'react'
import axios from 'axios'


export default function Profile() {
  useEffect(() => {
    axios.get('/api/user')
      .then(response => {response.json})
      .then(response => {response.data})
      .catch(error => {console.error('Error fetching user data:', error)})
  return (
    <>
      <div className="rounded rounded-full bg-secondary">
        <i className='bi bi-person'></i>
      </div>
      <div>
        
      </div>
    </>
  )
}