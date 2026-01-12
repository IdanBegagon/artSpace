import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function LoginForm({ setToken, setUserName }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", { email, password });
            const newToken = res.data.token;

            //saving tokenm to local storage to use it on app.jsx and for the browser to remember the token
            localStorage.setItem("token", newToken);
            setToken(newToken);
            //getting the username on login to display as a link to the user's profile
            const userNameRes = await axios.get("http://localhost:5001/api/auth/protected", {
                headers: { Authorization: `Bearer ${newToken}` }
            });

            //saving the username to the state in app.jsx and navigating to homepage
            if (userNameRes.data.userName) {
                setUserName(userNameRes.data.userName)
                navigate("/");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                <button type="submit">login</button>
            </form>

        </div>
    )
}

export default LoginForm;