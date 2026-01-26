import LoginForm from "../components/LoginForm";
import Protected from "../components/Protected";
import "../css/Forms.css"
import api from "../api.jsx";

function Login({ token, setToken, setUserName, setUserId }) {
    return (
        <div className="page-container">

                {!token ? (
                    <LoginForm setToken={setToken} setUserName={setUserName} setUserId={setUserId} />
                ) : (
                    <Protected token={token} />
                )}
            </div>
    )

}

export default Login;