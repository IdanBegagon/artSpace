import { Link } from "react-router-dom"
import "../css/Navbar.css"

function Navbar() {
    return (
        <nav>
            <div className="nav">
                <Link to="/" className="link">Home</Link>
                <Link to="/Profile" className="link">Profile</Link>
            </div>
        </nav>
    )
}

export default Navbar;