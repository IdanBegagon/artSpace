import { useState } from "react";
import axios from "axios";
import CreateStory from "../components/CreateStory"
import Protected from "../components/Protected";

function Login({ token }) {
    return (
        <div>
            <h1>Write a new story</h1>

            {token ? (
                <CreateStory token={token} />
            ) : (
                <p>you need to login in order to write a story</p>
            )}
        </div>
    )

}

export default Login;