import { Link } from "react-router-dom"
import "../css/Navbar.css"

function Navbar({ token, setToken, userName, setUserName }) {

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUserName(null);
    }

    return (
        <nav>
            <div className="nav">
                <Link to="/" className="link">Home</Link>
                {/* show only if tokeen exist (indicates that there's a user logged in) */}
                {token && <Link to="/profile" className="link">{userName}</Link>}

                {/* show different nav links depends if user is logged in or not */}
                {!token ? (
                    <>
                        <Link to="/signup" className="link">sign up</Link>
                        <Link to="/login" className="link">login</Link>
                    </>
                ) : (
                    <button className="link" onClick={handleLogout}>Logout</button>
                )}

            </div>
        </nav>
    )
}

export default Navbar;