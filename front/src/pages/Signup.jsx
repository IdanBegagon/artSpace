import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api.jsx";

function Signup({ setToken,setUserId, setUserName }) {
    const navigate = useNavigate();

    const [data, setData] = useState({
        userName: '',
        email: '',
        password: '',
    });

    const [errMsg, setErrMsg] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const { userName, email, password } = data;
        try {
            const res = await api.post("/api/auth/signup", { userName, email, password });

            if (res.data.success) {

                const newToken = res.data.token;
                const newUserId = res.data.userId;
                localStorage.setItem("token", newToken);

                setToken(newToken);
                setUserId(newUserId);
                setUserName(userName);


                setToken(newToken);
                setUserId(data.userId);
                navigate("/");
            }
            else {
                setErrMsg(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleLogin() {
        navigate("/login");
    }

    return (
        <div className="form-page">
            <form className="credentials" onSubmit={handleSubmit}>

                <h1 className="form-title">Create a new account</h1>
                <hr />

                <label className="signup-label">Username*
                <input className="input-box" type="text" placeholder="enter username" value={data.userName} onChange={e => setData({ ...data, userName: e.target.value })} />
                </label>
                

                <label className="signup-label">Email address*
                <input className="input-box" type="email" placeholder="enter email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                </label>

                <label className="signup-label">Password*
                <input className="input-box" type="password" placeholder="enter password" value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />
                </label>

                <div>
                    <span>Already have an account?</span> <span className="signup-no-usr" onClick={handleLogin}>Login</span>
                </div>

                <button className="submit-btn" type="submit">sign up</button>
                <p>{errMsg}</p>
            </form>


        </div>
    )

}

export default Signup;