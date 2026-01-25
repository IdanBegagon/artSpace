import { useState } from "react";
import Card from "../components/Card"
import "../css/Home.css"

function Home({ token, userId, cards, onToggleFavorite }) {

  const newestStories = cards?.slice(0, 6) || [];
  //for the loop to be smooth
  const displayStories = [...newestStories, ...newestStories];

  return (
    <div className="page-container">
      <div className="recent-releases">
        <h1>Recent Releases</h1>

        <div className="carousel-window">

          <div className="carousel-track smooth-scroll">
            {displayStories.map((card, index) => (
              <div className="carousel-item" key={`${card._id}-${index}`}>
                <Card
                  story={card}
                  token={token}
                  userId={userId}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;