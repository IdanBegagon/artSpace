import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/Forms.css";


function EditStoryPage({ token, onUpdateStory }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [edit, setEdit] = useState({
        title: "",
        content: "",
        summary: ""
    });
    const titleMaxChar = 40;
    const summaryMaxChar = 500;

    useEffect(() => {
        axios.get(`http://localhost:5001/api/story/getStoryById/${id}`)
            .then(res => {
                setEdit({
                    title: res.data.title,
                    content: res.data.content,
                    summary: res.data.summary
                });
            })
            .catch(error => console.log(`error getting the story: ${error}`));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:5001/api/story/editStory/${id}`, edit, {
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
                            onChange={e => setEdit({ ...edit, title: e.target.value })} />
                    </label>

                    <button className="submit-btn" type="submit">Update story</button>
                </form>
            </div>
        </div>
    )
}

export default EditStoryPage;