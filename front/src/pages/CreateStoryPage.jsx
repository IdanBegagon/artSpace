import { useState } from "react";
import axios from "axios";
import CreateStory from "../components/CreateStory"
import Protected from "../components/Protected";
import api from "../api.jsx";

function CreateStoryPage({ token, setCards }) {
    
    
    
    return (
        <div>
            {token ? (
                <CreateStory token={token} setCards={setCards} />
            ) : (
                <p>you need to login in order to write a story</p>
            )}
        </div>
    )

}

export default CreateStoryPage;