import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Forms.css";

function CreateStory({ token, setCards }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const navigate = useNavigate();
    const titleMaxChar = 40;
    const summaryMaxChar = 500;

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/story/createStory", { title, content, summary }, { headers: { Authorization: `Bearer ${token}` } });
            setCards(prevCards => [res.data.newStory, ...prevCards]);
            navigate("/profile");
        } catch (error) {
            console.log(`Error creating a story: ${error}`);
        }
    }

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

                    <button className="submit-btn" type="submit">Post story</button>
                </form>
            </div>
        </div>
    )
}

export default CreateStory;