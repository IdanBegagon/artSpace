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
import Card from './components/Card'
import api from "./api"


function App() {
  //made it to be able to use the token and username everywhere 
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    //getting the token i saved to local storage in 
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      api
        .get("/api/auth/protected", { headers: { Authorization: `Bearer ${savedToken}` } })
        .then(res => {
          if (res.data.userName || res.data.error !== "jwt expired") {
            setUserName(res.data.userName);
            setUserId(res.data.id);
          }
          else{
            handleLogout();
          }
        })
        .catch((error) => {
          console.log(`Token verification failed: ${error}`);
          localStorage.removeItem("token");
          setToken(null);
          setUserName(null);
        })
        .finally(() => {
          setIsLoadingUser(false); 
        });
    } else {
      setIsLoadingUser(false); 
    }
  }, []);

  //Load once all of the cards
  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await api.get("/api/story/getAllStories")
        setCards(res.data);
      } catch (error) {
        console.log("Error getting cards");
      } finally {
        setLoading(false);
      }
    }
    getCards();
  }, [])

      const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUserName(null);
        setUserId(null);
        navigate("/");
    }

  //getting the function variables from the card component (line 22)  
  const onToggleFavorite = (storyId, updatedFavorites) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card._id === storyId ? { ...card, favorites: updatedFavorites } : card
      )
    );
  };

  const handleRemoveCard = (storyId) => {
    setCards(prevCards => prevCards.filter(card => card._id !== storyId));
  };

  const onUpdateStory = (updatedStory) => {
  setCards(prevCards =>
    prevCards.map(card =>
      card._id === updatedStory._id ? updatedStory : card
    )
  );
};

  //search logic
  const searchedStories = search.trim() !== "" ?
    cards.filter((story) =>
      story.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
      story.author.userName.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const closeSearch = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  return (
    <div className='app-pages'>
      <nav>
        <Navbar
          token={token}
          setToken={setToken}
          userName={userName}
          setUserName={setUserName}
          setUserId={setUserId}
          search={search}
          setSearch={setSearch}
          setIsSearching={setIsSearching}
          isLoadingUser={isLoadingUser}
          handleLogout={handleLogout} />
      </nav>

      {isSearching && (
        <div className='search-overlay' onClick={() => setIsSearching(false)}>
          <div className='search-results' onClick={(e) => e.stopPropagation()}>
            <div className='search-results-header'>
              <h2>Search Results</h2>
              
            </div>
            <div className='results-grid'>
              {searchedStories.length > 0 ? (
                searchedStories.map(card => (
                  <Card key={card._id} story={card} closeSearch={closeSearch} />
                ))
              ) : (
                <p>No stories found</p>
              )}
            </div>
          </div>
        </div>
      )}

      <main>
        <Routes>
          <Route path='/' element={<Home token={token} userId={userId} cards={cards} setCards={setCards} onToggleFavorite={onToggleFavorite} />} />
          <Route path='/profile' element={<Profile token={token} userId={userId} cards={cards} setCards={setCards} onToggleFavorite={onToggleFavorite} handleRemoveCard={handleRemoveCard} />} />
          <Route path='/createStory' element={<CreateStory token={token} setCards={setCards} />} />
          <Route path='/signup' element={<Signup token={token} setToken={setToken} setUserId={setUserId} setUserName={setUserName} />} />
          <Route path='/story/:id' element={<StoryPage token={token} userId={userId} onToggleFavorite={onToggleFavorite}/>} />
          <Route path='/login' element={<Login token={token} setToken={setToken} setUserName={setUserName} setUserId={setUserId} />} />
          <Route path='/editStory/:id' element={<EditStoryPage token={token} onUpdateStory={onUpdateStory} />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
