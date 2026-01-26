import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Story.css"
import api from "../api.jsx";


function StoryPage({ token, userId, onToggleFavorite }) {
  //taking the id from the url
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    api.get(`/api/story/getStoryById/${id}`)
      .then(res => setStory(res.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleFavorite = async () => {
    if (!token) return alert("Please login to favorite stories");

    try {
      const res = await api.post(`/api/story/toggleFavorite/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setStory({ ...story, favorites: res.data.favorites });
        onToggleFavorite(id, res.data.favorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isFavorite = story?.favorites?.includes(userId);

  return (
    <>
      {story && (
        <div className="story-content">
          <div className="story-header">
            <h1>{story.title}</h1>

            <button className="favorite-btn-story" onClick={handleFavorite}>
              <img
                src={isFavorite ? "/favorite-icon-on.svg" : "/favorite-icon-off.svg"}
                alt="favorite"
              />
            </button>
          </div>

          <p className="story-author">{story.author.userName}</p>
          <p>{story.content}</p>
        </div>
      )}
    </>

  )
}

export default StoryPage