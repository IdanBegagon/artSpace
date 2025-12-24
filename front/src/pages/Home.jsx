import { useEffect, useState } from "react";
import Card from "../components/Card"
import "../css/Home.css"
import axios from "axios"


function Home() {
  
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  //Load once all of the cards
  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/cards")
        console.log(res.data);
        setCards(res.data);
      } catch (error) {
        console.log("Error getting cards");
      } finally{
        setLoading(false);
      }
    }

    getCards();
  },[])

  return (
    <div className="page-container">

      {loading && <div>Loading cards...</div>}

      {/* Presenting the new releases */}
      <div className="main-page-recommanded">
        {cards.map(card => (
          <Card card={card} key={card.id} />
        ))}
      </div>

    </div>
  )
}

export default Home;