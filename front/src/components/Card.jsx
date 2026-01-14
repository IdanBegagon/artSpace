import { Link } from "react-router-dom";
import "../css/Card.css"
import { useState } from "react";
import axios from "axios";

function Card({ story, edit, token, handleRemove }) {

    const [favorite, setFavorite] = useState(false);

    function favoriteHandle(e) {
        setFavorite(!favorite);
        e.preventDefault();
        e.stopPropagation();
    }

    async function handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();

        //an alert that let the user confirm the deletion
        if (window.confirm("Are you sure you want to delete this story?")) {
            try {
                const res = await axios.delete(`http://localhost:5001/api/story/deleteStory/${story._id}`, { headers: { Authorization: `Bearer ${token}` } });

                if (res.data.success) {
                    handleRemove(story._id);
                }

            } catch (error) {
                console.log(`Delete failed: ${error}`);
            }
        }
    }


    return (
        <Link to={`/story/${story._id}`} className="card">


            {edit &&
                <div className="action-btn">
                    <button className="circle-btn delete-btn" onClick={handleDelete}><img src="/delete-icon.svg" alt="delete button" /></button>
                    <button className="circle-btn edit-btn"><img src="/edit-icon.svg" alt="edit button" /></button>
                </div>}

            <div className="top">
                <span className="card-title">{story.title}</span>
                <button className="favorite-btn" onClick={favoriteHandle}>
                    {favorite ? <img src="/favorite-icon-on.svg" alt="favorite button" /> : <img src="/favorite-icon-off.svg" alt="favorite button" />}
                </button>

            </div>

            <div className="card-author">{story.author.userName}</div>

            <div className="summary">{story.summary}</div>


        </Link>
    )
}

export default Card;