import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; 

export default function NavBar() {
    const { isAuthenticated, logout: handleLogout } = useAuth();

    return (
        <nav className="nav-bar">
            <Link to="/" className="site-title">Visited Countries</Link>
            <ul>
                {isAuthenticated ? (
                    <>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/register"><button>Register</button></Link>
                        </li>
                        <li>
                            <Link to="/login"><button>Login</button></Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
