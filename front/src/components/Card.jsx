import { Link, useNavigate } from "react-router-dom";
import "../css/Card.css"
import { useState } from "react";
import axios from "axios";

function Card({ story, edit, view, token, handleRemoveCard, userId, onToggleFavorite, closeSearch }) {

    const isFavorite = story.favorites?.includes(userId);
    const navigate = useNavigate();

    async function handleFavorite(e) {
        e.preventDefault();
        e.stopPropagation();

        try {
            const res = await axios.post(`http://localhost:5001/api/story/toggleFavorite/${story._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                onToggleFavorite(story._id, res.data.favorites);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();

        //an alert that let the user confirm the deletion
        if (window.confirm("Are you sure you want to delete this story?")) {
            try {
                const res = await axios.delete(`http://localhost:5001/api/story/deleteStory/${story._id}`, { headers: { Authorization: `Bearer ${token}` } });

                if (res.data.success) {
                    handleRemoveCard(story._id);
                }

            } catch (error) {
                console.log(`Delete failed: ${error}`);
            }
        }
    }

    function handleEdit(e) {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/editStory/${story._id}`);
    }


    return (
        <Link to={`/story/${story._id}`} className="card" onClick={closeSearch}>


            {edit &&
                <div className="action-btn">
                    <button className="circle-btn delete-btn" onClick={handleDelete}><img src="/delete-icon.svg" alt="delete button" /></button>
                    <button className="circle-btn edit-btn" onClick={handleEdit}><img src="/edit-icon.svg" alt="edit button" /></button>
                </div>}

            <div className="top">
                <span className="card-title">{story.title}</span>
                <button className="favorite-btn" onClick={handleFavorite}>
                    <img src={isFavorite ? "/favorite-icon-on.svg" : "/favorite-icon-off.svg"} />
                </button>

            </div>

            <div className="card-author">{story.author.userName}</div>

            <div className="summary">{story.summary}</div>

            <div className="card-genres-bleeding">
                {story.genres?.slice(0, 2).map((g, index) => (
                    <span key={index} className="genre-pill">
                        {g}
                    </span>
                ))}
            </div>


        </Link>
    )
}

export default Card;