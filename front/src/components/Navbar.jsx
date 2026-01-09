import { Link } from "react-router-dom"
import "../css/Navbar.css"

function Navbar() {
    return (
        <nav>
            <div className="nav">
                <Link to="/" className="link">Home</Link>
                <Link to="/profile" className="link">Profile</Link>
                <Link to="/signup" className="link">sign up</Link>
                <Link to="/login" className="link">login</Link>
            </div>
        </nav>
    )
}

export default Navbar;