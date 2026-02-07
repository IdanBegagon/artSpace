import { Link } from "react-router-dom"
import { useState } from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";
import api from "../api.jsx";

function Navbar({ token, setToken, userName, setUserName, setUserId, search, setSearch, setIsSearching, isLoadingUser, handleLogout }) {

    const [isCollapsed, setIsCollapsed] = useState(false)
    const navigate = useNavigate();

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <nav>
            <div className="nav">
                <Link to="/" className="link main-page-link">
                    <img src="/ArtSpaceIcon.png" className="artspace-icon" alt="home page" />
                    ArtSpace</Link>

                <div className="nav-search">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search stories..."
                        value={search}
                        onFocus={() => setIsSearching(true)}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>


                {/* show different nav links depends if user is logged in or not */}
                {!token ? (
                    <div className="log-sign">
                        <Link to="/signup" className="link">sign up</Link>
                        <Link to="/login" className="link">login</Link>
                    </div>
                ) : (
                    isLoadingUser ? (
                        <span>Loading...</span>
                    ) : (

                        <div className="collapse">
                            <span className="link" onClick={handleCollapse}>{userName}</span>

                            <div className={`collapse-items ${isCollapsed ? "show" : ""}`}>
                                <Link to="/profile" onClick={handleCollapse} className="link collapse-link">
                                    <img src="/profile-icon.svg" alt="" />
                                </Link>
                                <Link to="/createStory" onClick={handleCollapse} className="link collapse-link">
                                    <img src="/write-icon.svg" alt="" />
                                </Link>
                                <span
                                    className="link collapse-link"
                                    onClick={() => { handleCollapse(); handleLogout(); }}
                                > <img src="/logout-icon.svg" alt="" />
                                </span>
                            </div>
                        </div>

                    )
                )}

            </div>
        </nav>
    )
}

export default Navbar;