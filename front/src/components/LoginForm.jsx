import { useState } from "react"
import axios from "axios"

function LoginForm({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", { email, password });

            setToken(res.data.token);

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