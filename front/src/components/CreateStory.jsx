import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Forms.css";

function CreateStory({ token, setCards }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    
    const genres = ["Fantasy", "Sci-Fi", "Romance", "Horror", "Mystery", "Drama", "Action", "Comedy"];
    const navigate = useNavigate();
    const titleMaxChar = 40;
    const summaryMaxChar = 500;

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/story/createStory", { title, content, summary, genres: selectedGenres }, { headers: { Authorization: `Bearer ${token}` } });
            setCards(prevCards => [res.data.newStory, ...prevCards]);
            navigate("/profile");
        } catch (error) {
            console.log(`Error creating a story: ${error}`);
        }
    }

    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    return (
        <div className="form-page">
            <div className="outer-form">
                <h1 className="form-title">Write a new story</h1>
                <hr />

                <form className="form-container" onSubmit={handleSubmit}>

                    <label className="title-label">
                        <span className="line">
                            <span>Story title</span> <span>{title.length}/40</span>
                        </span>
                        <input className="input-box" type="text" maxLength={titleMaxChar} value={title} onChange={e => setTitle(e.target.value)} />
                    </label>

                    <label>Your story
                        <textarea className="input-box content-box" type="text" value={content} onChange={e => setContent(e.target.value)} />
                    </label>

                    <label>
                        <span className="line">
                            <span>Story summary</span> <span>{summary.length}/500</span>
                        </span>
                        <textarea className="input-box summary-box" type="text" maxLength={summaryMaxChar} value={summary} onChange={e => setSummary(e.target.value)} />
                    </label>

                    <label>Genres</label>  
                        <div className="genre-selection-container">
                            {genres.map(g => (
                                <div
                                    key={g}
                                    className={`genre-capsule ${selectedGenres.includes(g) ? "active" : ""}`}
                                    onClick={() => toggleGenre(g)}
                                >
                                    {g}
                                </div>
                            ))}
                        </div>

                    <button className="submit-btn" type="submit">Post story</button>
                </form>
            </div>
        </div>
    )
}

export default CreateStory;