import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function EditStoryPage({ token }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [edit, setEdit] = useState({
        title: "",
        content: "",
        summary: ""
    });

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
                navigate("/profile");
            }
            else{
                alert(data.message);
            }
        } catch (error) {
            console.log(`error editing: ${error}`);
        }
    }

    return (
        <>
            <h1>Edit story</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    value={edit.title}
                    onChange={e => setEdit({ ...edit, title: e.target.value })} />

                <label>content</label>
                <input
                    type="text"
                    value={edit.content}
                    onChange={e => setEdit({ ...edit, content: e.target.value })} />

                <label>summary</label>
                <input
                    type="text"
                    value={edit.summary}
                    onChange={e => setEdit({ ...edit, title: e.target.value })} />

                <button type="submit">Update story</button>
            </form>

        </>
    )
}

export default EditStoryPage;