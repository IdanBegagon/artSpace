import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import axios from "axios"
import "./css/App.css"
import Home from './pages/Home'
import Profile from './pages/Profile'
import StoryPage from './pages/StoryPage'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CreateStory from './pages/CreateStoryPage'


function App() {
  //made it to be able to use the token and username everywhere 
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    //getting the token i saved to local storage in 
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      axios
        .get("http://localhost:5001/api/auth/protected", { headers: { Authorization: `Bearer ${savedToken}` } })
        .then(res => {
          if (res.data.userName) {
            setUserName(res.data.userName);
          }
        })
        .catch((error) => {
          console.log(`Token verification failed: ${error}`);
          localStorage.removeItem("token");
          setToken(null);
          setUserName(null);
        })
    }
  }, []);

  return (
    <div className='app-pages'>
      <nav>
        <Navbar token={token} setToken={setToken} userName={userName} setUserName={setUserName} />
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile token={token} />} />
          <Route path='/createStory' element={<CreateStory token={token} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/story/:id' element={<StoryPage />} />
          <Route path='/login' element={<Login token={token} setToken={setToken} setUserName={setUserName} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
