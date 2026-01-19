import LoginForm from "../components/LoginForm"
import Protected from "../components/Protected";

function Login({ token, setToken, setUserName, setUserId }) {
    return (
        <div>
            <h1>Login page</h1>

            {!token ? (
                <LoginForm setToken={setToken} setUserName={setUserName} setUserId={setUserId} />
            ) : (
                <Protected token={token} />
            )}
        </div>
    )

}

export default Login;