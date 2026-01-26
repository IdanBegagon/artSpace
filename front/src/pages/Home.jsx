import { useState } from "react";
import Card from "../components/Card"
import "../css/Home.css"

function Home({ token, userId, cards, onToggleFavorite }) {

  const newestStories = cards?.slice(0, 6) || [];
  //for the loop to be smooth
  const displayStories = [...newestStories, ...newestStories];
  const genresList = ["Fantasy", "Sci-Fi", "Romance", "Horror", "Mystery", "Drama", "Action", "Comedy"];


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



     <div className="home-container">
      {genresList.map((genreName) => {
        // Filter stories where the genre is one of the first two tags
        const topStories = cards
          .filter(story => story.genres?.slice(0, 2).includes(genreName))
          .slice(0, 3); // Get the top 3

        if (topStories.length === 0) return null;

        return (
          <div key={genreName} className="genre-row-container">
            <h2 className="genre-row-title">{genreName}</h2>
            <div className="genre-flex-row">
              {topStories.map(story => (
                <div key={`${genreName}-${story._id}`} className="flex-card-wrapper">
                  <Card 
                    story={story} 
                    token={token} 
                    userId={userId} 
                    onToggleFavorite={onToggleFavorite} 
                  />
                </div>
              ))}
            </div>
            <hr className="hr-genre-row" />
          </div>
        );
      })}
    </div>


    </div>
  );
}

export default Home;