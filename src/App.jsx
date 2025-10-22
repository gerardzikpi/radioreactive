import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Blog from './pages/Blog'
import NewPost from './pages/NewPost'
import Footer from './components/Footer'
import Signin from './components/Signin'
import { Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


function App() {
  return (
    <>
      <title>Radioreactive</title>
      <Routes>
        <Route path='/' element={<Blog />} />
        <Route path="/createpost" element={<NewPost/>} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
