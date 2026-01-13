import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Story.css"


function StoryPage() {
  //taking the id from the url
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/story/getStoryById/${id}`)
      .then(res => setStory(res.data))
      .catch(error => console.log(error));
  }, [id]);

  return (
    <>
      {story && (
        <div className="story-content">
          <h1>{story.title}</h1>
          <p className="story-author">{story.author.userName}</p>
          <p>{story.content}</p>
        </div>
      )}
    </>

  )
}

export default StoryPage