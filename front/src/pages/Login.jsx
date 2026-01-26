import LoginForm from "../components/LoginForm";
import Protected from "../components/Protected";
import "../css/forms.css"

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