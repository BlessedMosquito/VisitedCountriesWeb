import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="nav-bar">
            <Link to="/" className="site-title">Visited Countries</Link>
            <ul>
                <li><Link to="/register"><button>Register</button></Link></li>
                <li><Link to="/login"><button>Login</button></Link></li>
            </ul>
        </nav>
    );
}