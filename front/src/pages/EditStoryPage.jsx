import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/Forms.css";
import api from "../api.jsx";


function EditStoryPage({ token, onUpdateStory }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [edit, setEdit] = useState({
        title: "",
        content: "",
        summary: "",
        genres: []
    });
    const titleMaxChar = 40;
    const summaryMaxChar = 500;
    const genresList = ["Fantasy", "Sci-Fi", "Romance", "Horror", "Mystery", "Drama", "Action", "Comedy"];

    useEffect(() => {
        api.get(`/api/story/getStoryById/${id}`)
            .then(res => {
                setEdit({
                    title: res.data.title,
                    content: res.data.content,
                    summary: res.data.summary,
                    genres: res.data.genres || []
                });
            })
            .catch(error => console.log(`error getting the story: ${error}`));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.put(`/api/story/editStory/${id}`, edit, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                onUpdateStory(data.editStory)
                navigate("/profile");
            }
            else {
                alert(data.message);
            }
        } catch (error) {
            console.log(`error editing: ${error}`);
        }
    }

    const toggleGenre = (genre) => {
        setEdit(prev => {
            const isSelected = prev.genres.includes(genre);
            return {
                ...prev,
                genres: isSelected 
                    ? prev.genres.filter(g => g !== genre) 
                    : [...prev.genres, genre]
            };
        });
    };

    return (
        <div className="form-page">
            <div className="outer-form">
                <h1 className="form-title">Edit story</h1>
                <hr />

                <form className="form-container" onSubmit={handleSubmit}>
                    <label className="title-label">
                        <span className="line">
                            <span>Story title</span> <span>{edit.title.length}/{titleMaxChar}</span>
                        </span>
                        <input
                            className="input-box"
                            type="text"
                            value={edit.title}
                            onChange={e => setEdit({ ...edit, title: e.target.value })} />
                    </label>

                    <label>Your story
                        <textarea
                            className="input-box content-box"
                            
                            value={edit.content}
                            onChange={e => setEdit({ ...edit, content: e.target.value })} />
                    </label>

                    <label>
                        <span className="line">
                            <span>Story summary</span> <span>{edit.summary.length}/{summaryMaxChar}</span>
                        </span>
                        <textarea
                            className="input-box summary-box"
                            value={edit.summary}
                            onChange={e => setEdit({ ...edit, summary: e.target.value })} />
                    </label>

                    <label>Edit Genres</label>
                    <div className="genre-selection-container">
                        {genresList.map(g => (
                            <div 
                                key={g} 
                                className={`genre-capsule ${edit.genres?.includes(g) ? "active" : ""}`}
                                onClick={() => toggleGenre(g)}
                            >
                                {g}
                            </div>
                        ))}
                    </div>

                    <button className="submit-btn" type="submit">Update story</button>
                </form>
            </div>
        </div>
    )
}

export default EditStoryPage;