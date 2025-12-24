import { Link } from "react-router-dom";
import "../css/Card.css"
import { useState } from "react";

function Card({ card }) {

    const [favorite, setFavorite] = useState(false);


    return (
        <Link to={`/card/${card._id}`} className="card"> 
        
            <div className="top">
                <span className="filler"></span>
                <span className="card-title">{card.title}</span>
                <button className="favorite-btn" onClick={() => setFavorite(!favorite)}>
                    {favorite ? <img src="/favorite-icon-on.svg" alt="favorite button" /> : <img src="/favorite-icon-off.svg" alt="favorite button" />}
                </button>

            </div>

            <div className="author">{card.author}</div>

            <div className="summary">{card.summary}</div>

            {/* <button className="read-button">Read</button> */}

        </Link>
    )
}

export default Card;