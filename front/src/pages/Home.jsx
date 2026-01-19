import Card from "../components/Card"
import "../css/Home.css"



function Home({token, userId, cards, onToggleFavorite}) {

  return (
    <div className="page-container">

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
  )
}

export default Home;