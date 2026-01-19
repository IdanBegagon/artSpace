import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card"
import "../css/Home.css"


function Profile({ token, userId, cards, onToggleFavorite }) {
    const [stories, setStories] = useState([]);
    const [edit, setEdit] = useState(false);
    const [view, setView] = useState("userStories");

    const handleRemove = (deletedStory) => {
        setStories(stories.filter(s => s._id !== deletedStory));
    }

    const displayCards = cards.filter(card => {
        if (view === "userStories") {
            return card.author._id === userId;
        } else {
            return card.favorites?.includes(userId);
        }
    });



    return (
        <div className="page-container">
            <div className="main-page-recommanded">
                {displayCards.map(story => (
                    <Card
                        story={story}
                        edit={edit}
                        key={story._id}
                        token={token}
                        handleRemove={handleRemove}
                        userId={userId}
                        onToggleFavorite={onToggleFavorite} />))}
            </div>
            <button onClick={() => setEdit(!edit)}>Edit</button>
            <button onClick={() => setView("userStories")}>My Stories</button>
            <button onClick={() => setView("favorites")}>Favorites</button>
        </div>

    )
}

export default Profile;