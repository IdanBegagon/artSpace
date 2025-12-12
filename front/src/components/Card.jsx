import "../css/Card.css"
import { useState } from "react";

function Card({ card }) {

    const [favorite, setFavorite] = useState(false);


    return (
        <div className="card">
            <div className="top">
                <span className="filler"></span>
                <span className="card-title">{card.title}</span>
                <button className="favorite-btn" onClick={() => setFavorite(!favorite)}>
                    {favorite ? <img src="/favorite-icon-on.svg" alt="favorite button" /> : <img src="/favorite-icon-off.svg" alt="favorite button" />}
                </button>

            </div>

            <div className="author">{card.author}</div>

            <div className="summary">{card.summery}</div>

            <button className="read-button">Read</button>

        </div >
    )
}

export default Card;