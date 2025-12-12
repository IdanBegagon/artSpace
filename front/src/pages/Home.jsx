import Card from "../components/Card"
import "../css/Home.css"


function Home() {
  const cards = [
    {
      id: 1,
      title: "re:zero",
      author: "Tappei Nagatsuki",
      summery: "Re:Zero (Light Novels) follows Natsuki Subaru, a Japanese teen suddenly summoned to a fantasy world, who gains the power \"Return by Death\" to reset time upon dying, forcing him to endure immense suffering and death to save his new friends, especially the silver-haired half-elf Emilia, as he grapples with his own flaws and the dark, complex forces of this new world, driven by his desire to live a meaningful life and protect those he cares for, all while uncovering deep conspiracies."
    },
    {
      id: 2,
      title: "G.O.T",
      author: "George RR Martin",
      summery: "Game of Thrones (GOT) book series (A Song of Ice and Fire) summarizes a massive fantasy epic where noble families in the fictional continents of Westeros & Essos battle for the Iron Throne, while an ancient supernatural threat from beyond the Wall awakens; it's defined by complex characters, political intrigue, moral ambiguity, and shocking betrayals, following storylines like Starks in the North, Lannisters in the South, and exiled Daenerys Targaryen's rise with dragons, all amidst impending winter."
    },
    {
          id: 3,
      title: "G.O.T",
      author: "George RR Martin",
      summery: "Game of Thrones (GOT) book series (A Song of Ice and Fire) summarizes a massive fantasy epic where noble families in the fictional continents of Westeros & Essos battle for the Iron Throne, while an ancient supernatural threat from beyond the Wall awakens; it's defined by complex characters, political intrigue, moral ambiguity, and shocking betrayals, following storylines like Starks in the North, Lannisters in the South, and exiled Daenerys Targaryen's rise with dragons, all amidst impending winter."
    },
    {
          id: 3,
      title: "G.O.T",
      author: "George RR Martin",
      summery: "Game of Thrones (GOT) book series (A Song of Ice and Fire) summarizes a massive fantasy epic where noble families in the fictional continents of Westeros & Essos battle for the Iron Throne, while an ancient supernatural threat from beyond the Wall awakens; it's defined by complex characters, political intrigue, moral ambiguity, and shocking betrayals, following storylines like Starks in the North, Lannisters in the South, and exiled Daenerys Targaryen's rise with dragons, all amidst impending winter."
    },
    {
          id: 3,
      title: "G.O.T",
      author: "George RR Martin",
      summery: "Game of Thrones (GOT) book series (A Song of Ice and Fire) summarizes a massive fantasy epic where noble families in the fictional continents of Westeros & Essos battle for the Iron Throne, while an ancient supernatural threat from beyond the Wall awakens; it's defined by complex characters, political intrigue, moral ambiguity, and shocking betrayals, following storylines like Starks in the North, Lannisters in the South, and exiled Daenerys Targaryen's rise with dragons, all amidst impending winter."
    },
    {
          id: 3,
      title: "G.O.T",
      author: "George RR Martin",
      summery: "Game of Thrones (GOT) book series (A Song of Ice and Fire) summarizes a massive fantasy epic where noble families in the fictional continents of Westeros & Essos battle for the Iron Throne, while an ancient supernatural threat from beyond the Wall awakens; it's defined by complex characters, political intrigue, moral ambiguity, and shocking betrayals, following storylines like Starks in the North, Lannisters in the South, and exiled Daenerys Targaryen's rise with dragons, all amidst impending winter."
    },
    {
          id: 3,
      title: "G.O.T",
      author: "George RR Martin",
      summery: "Game of Thrones (GOT) book series (A Song of Ice and Fire) summarizes a massive fantasy epic where noble families in the fictional continents of Westeros & Essos battle for the Iron Throne, while an ancient supernatural threat from beyond the Wall awakens; it's defined by complex characters, political intrigue, moral ambiguity, and shocking betrayals, following storylines like Starks in the North, Lannisters in the South, and exiled Daenerys Targaryen's rise with dragons, all amidst impending winter."
    },
    {
          id: 3,
      title: "G.O.T",
      author: "George RR Martin",
      summery: "Game of Thrones (GOT) book series (A Song of Ice and Fire) summarizes a massive fantasy epic where noble families in the fictional continents of Westeros & Essos battle for the Iron Throne, while an ancient supernatural threat from beyond the Wall awakens; it's defined by complex characters, political intrigue, moral ambiguity, and shocking betrayals, following storylines like Starks in the North, Lannisters in the South, and exiled Daenerys Targaryen's rise with dragons, all amidst impending winter."
    },
    {
          id: 3,
      title: "G.O.T",
      author: "George RR Martin",
      summery: "Game of Thrones (GOT) book series (A Song of Ice and Fire) summarizes a massive fantasy epic where noble families in the fictional continents of Westeros & Essos battle for the Iron Throne, while an ancient supernatural threat from beyond the Wall awakens; it's defined by complex characters, political intrigue, moral ambiguity, and shocking betrayals, following storylines like Starks in the North, Lannisters in the South, and exiled Daenerys Targaryen's rise with dragons, all amidst impending winter."
    },
  ];


  return (
    <div className="page-container">

      <div className="placeholder"></div>

      <div className="main-page-recommanded">
        {cards.map(card => (
          <Card card={card} key={card.id} />
        ))}
      </div>

    </div>
  )
}

export default Home;