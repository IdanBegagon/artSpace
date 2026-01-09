import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import "./css/App.css"
import Home from './pages/Home'
import Profile from './pages/Profile'
import Stories from './pages/Stories'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'


function App() {


  return (
    <div className='app-pages'>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/story/:id' element={<Stories />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
