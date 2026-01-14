import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card"


function Profile({ token }) {
    const [stories, setStories] = useState([]);
    const [edit, setEdit] = useState(false);

    const handleRemove = (deletedStory) => {
        setStories(stories.filter(s => s._id !== deletedStory));
    }

    useEffect(() => {
        if (token) {
            axios.get("http://localhost:5001/api/story/getUserStories", { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    console.log("Stories received:", res.data);
                    if (res.data.success) {
                        setStories(res.data.stories);
                    }
                })
                .catch(error => console.log(error));
        }
    }, [token]);

    async function handleManageStories() {
        try {

        } catch (error) {

        }

    }


    return (
        <>
            <div className="page-container">
                {stories.map(story => (
                    <Card
                        story={story}
                        edit={edit}
                        key={story._id}
                        token={token}
                        handleRemove={handleRemove} />))}
            </div>
            <button onClick={() => setEdit(!edit)}>Edit</button>
        </>

    )
}

export default Profile;