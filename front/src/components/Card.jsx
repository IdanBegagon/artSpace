import { Link } from "react-router-dom";
import "../css/Card.css"
import { useState } from "react";

function Card({ card }) {

    const [favorite, setFavorite] = useState(false);


    //color the favorite button and seperated it from the Link navigation
    function favoriteHandle(e){
        setFavorite(!favorite);
        e.preventDefault();
        e.stopPropagation();
    }


    return (
        <Link to={`/card/${card._id}`} className="card"> 
        
            <div className="top">
                <span className="filler"></span>
                <span className="card-title">{card.title}</span>
                <button className="favorite-btn" onClick={favoriteHandle}>
                    {favorite ? <img src="/favorite-icon-on.svg" alt="favorite button" /> : <img src="/favorite-icon-off.svg" alt="favorite button" />}
                </button>

            </div>

            <div className="author">{card.author}</div>

            <div className="summary">{card.summary}</div>

        </Link>
    )
}

export default Card;