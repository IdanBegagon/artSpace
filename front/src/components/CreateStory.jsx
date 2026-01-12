import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateStory({ token }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/api/story/createStory", { title, content, summary }, { headers: { Authorization: `Bearer ${token}` } })
            navigate("/profile");
        } catch (error) {
            console.log(`Error creating a story: ${error}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <label>Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />

            <label>Content</label>
            <textarea type="text" value={content} onChange={e => setContent(e.target.value)} />

            <label>Summary</label>
            <textarea type="text" value={summary} onChange={e => setSummary(e.target.value)} />

            <button type="submit">Post story</button>
        </form>
    )
}

export default CreateStory;