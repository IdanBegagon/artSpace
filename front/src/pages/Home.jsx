import Card from "../components/Card"
import "../css/Home.css"



function Home({ token, userId, cards, onToggleFavorite }) {

  return (
    <div className="page-container">

      <div className="recent-releases">
        <h1>Recent Releases</h1>
        {/* Presenting all summary releases */}
        <div className="main-page-recommanded">
          {cards.map(card => (
            <Card
              story={card}
              key={card._id}
              token={token}
              userId={userId}
              onToggleFavorite={onToggleFavorite} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home;