import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card"


function Profile({ token }) {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        if (token) {
            axios.get("http://localhost:5001/api/story/getUserStories", { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    console.log("Stories received:", res.data);
                    if (res.data.success){
                        setStories(res.data.stories);
                    }
                })
                .catch(error => console.log(error));
        }
    }, [token]);


    return (
        <>
        <p>That's your profile</p>
        
        {stories.map(story => (
            <Card story={story} key={story._id}/>
        ))}
        </>
    )
}

export default Profile;