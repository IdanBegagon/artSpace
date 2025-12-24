import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Profile from './pages/Profile'
import Stories from './pages/Stories'
import Navbar from './components/Navbar'
import "./css/App.css"


function App() {


  return (
    <div className='app-pages'>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/story/:id' element={<Stories />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
