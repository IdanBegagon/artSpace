import { Link } from "react-router-dom"
import { useState } from "react";
import "../css/Navbar.css"

function Navbar({ token, setToken, userName, setUserName }) {

    const [isCollapsed, setIsCollapsed] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUserName(null);
    }

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <nav>
            <div className="nav">
                <Link to="/" className="link main-page-link">
                    <img src="/ArtSpaceIcon.png" className="artspace-icon" alt="home page" />
                    ArtSpace</Link>


                {/* show different nav links depends if user is logged in or not */}
                {!token ? (
                    <>
                        <Link to="/signup" className="link">sign up</Link>
                        <Link to="/login" className="link">login</Link>
                    </>
                ) : (
                    <>
                        {!isCollapsed ? (
                            <span className="link" onClick={handleCollapse}>{userName}</span>
                        ) : (
                            <div className="collapse">
                                <span className="link" onClick={handleCollapse}>{userName}</span>
                                <div className="collapse-items">
                                <Link to="/profile" onClick={handleCollapse} className="link collapse-link">Your profile</Link>
                                <Link to="/createStory" onClick={handleCollapse} className="link collapse-link">+</Link>
                                <span className="link collapse-link" onClick={() => { handleCollapse(); handleLogout(); }}>Logout</span>
                                </div>
                            </div>
                        )}
                    </>
                )}

            </div>
        </nav>
    )
}

export default Navbar;