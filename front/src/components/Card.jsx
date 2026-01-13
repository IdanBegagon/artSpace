import { Link } from "react-router-dom";
import "../css/Card.css"
import { useState } from "react";

function Card({ story }) {

    const [favorite, setFavorite] = useState(false);


    //color the favorite button and seperated it from the Link navigation
    function favoriteHandle(e){
        setFavorite(!favorite);
        e.preventDefault();
        e.stopPropagation();
    }


    return (
        <Link to={`/story/${story._id}`} className="card"> 
        
            <div className="top">
                <span className="filler"></span>
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