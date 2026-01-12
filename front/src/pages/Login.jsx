import { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm"
import Protected from "../components/Protected";

function Login({ token, setToken, setUserName }) {
    return (
        <div>
            <h1>Login page</h1>

            {!token ? (
                <LoginForm setToken={setToken} setUserName={setUserName} />
            ) : (
                <Protected token={token} />
            )}
        </div>
    )

}

export default Login;