import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            const res = await axios.post("http://localhost:5001/api/auth/signup", { userName, email, password });

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
                setErrMsg(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleLogin() {
        navigate("/login");
    }

    return (
        <div className="page-container">
            <form className="credentials" onSubmit={handleSubmit}>

                <h1 className="form-title">Create a new account</h1>
                <hr />

                <label>Username*</label>
                <input className="input-box" type="text" placeholder="enter username" value={data.userName} onChange={e => setData({ ...data, userName: e.target.value })} />

                <label>Email address*</label>
                <input className="input-box" type="email" placeholder="enter email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />

                <label>Password*</label>
                <input className="input-box" type="password" placeholder="enter password" value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />

                <div>
                    <span>Already have an account?</span> <span className="signup-no-usr" onClick={handleLogin}>Login</span>
                </div>

                <button className="submit-btn">sign up</button>
                <p>{errMsg}</p>
            </form>


        </div>
    )

}

export default Signup;