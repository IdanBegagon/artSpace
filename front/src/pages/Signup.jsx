import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
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
            const { data } = await axios.post("http://localhost:5001/api/auth/signup", {userName, email, password});

            if (!data.success) {
                //alert(data.message);
                setErrMsg(data.message);
            }
            else {
                setData({});
                console.log("Registered succsessfully");
                navigate('/');
            }
        } catch (error) {

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder="enter username" value={data.userName} onChange={e => setData({ ...data, userName: e.target.value })} />

                <label>Email address</label>
                <input type="email" placeholder="enter email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />

                <label>Password</label>
                <input type="password" placeholder="enter password" value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />

                <button>sign up</button>
            </form>

            <p>{errMsg}</p>

        </div>
    )

}

export default Signup;