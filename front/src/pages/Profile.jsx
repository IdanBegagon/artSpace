import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card"
import "../css/Home.css"
import "../css/Profile.css"


function Profile({ token, userId, cards, onToggleFavorite, handleRemoveCard }) {
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
        <div className="page-container profile-page">

            <div className="profile-button-swap">
                <button className={`profile-btn ${view === "userStories" ? "active" : ""}`} onClick={() => setView("userStories")}>My Stories</button>
                <button className={`profile-btn ${view === "favorites" ? "active" : ""}`} onClick={() => {
                    setView("favorites");
                    setEdit(false);
                }}>Favorites
                </button>
                <div className={`sliding-underline ${view}`} />
            </div>

            <div className="main-page-recommanded">
                {displayCards.map(story => (
                    <Card
                        story={story}
                        edit={edit}
                        view={view}
                        key={story._id}
                        token={token}
                        handleRemoveCard={handleRemoveCard}
                        userId={userId}
                        onToggleFavorite={onToggleFavorite} />))}
            </div>

            {view === "userStories" && <button className="floating-edit-btn" onClick={() => setEdit(!edit)}>
                    <img src="/edit-btn-icon.svg" alt="" />
            </button>}

        </div>

    )
}

export default Profile;