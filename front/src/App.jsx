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
import EditStoryPage from './pages/EditStoryPage'


function App() {
  //made it to be able to use the token and username everywhere 
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cards, setCards] = useState([]);

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
            setUserId(res.data.id);
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

  //Load once all of the cards
  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/story/getAllStories")
        setCards(res.data);
      } catch (error) {
        console.log("Error getting cards");
      } finally {
        setLoading(false);
      }
    }
    getCards();
  }, [])

  //getting the function variables from the card component (line 22)  
  const onToggleFavorite = (storyId, updatedFavorites) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card._id === storyId ? { ...card, favorites: updatedFavorites } : card
      )
    );
  };

  return (
    <div className='app-pages'>
      <nav>
        <Navbar token={token} setToken={setToken} userName={userName} setUserName={setUserName} setUserId={setUserId} />
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Home token={token} userId={userId} cards={cards} setCards={setCards} onToggleFavorite={onToggleFavorite} />} />
          <Route path='/profile' element={<Profile token={token} userId={userId} cards={cards} setCards={setCards} onToggleFavorite={onToggleFavorite} />} />
          <Route path='/createStory' element={<CreateStory token={token} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/story/:id' element={<StoryPage />} />
          <Route path='/login' element={<Login token={token} setToken={setToken} setUserName={setUserName} setUserId={setUserId} />} />
          <Route path='/editStory/:id' element={<EditStoryPage token={token} />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
