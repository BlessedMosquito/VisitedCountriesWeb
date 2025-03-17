import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated, logout } from "./AuthService";

export default function NavBar() {
    const [authenticated, setAuthenticated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated(); 
            setAuthenticated(result);
        };

        checkAuth();
    }, []); 

    const handleLogout = async () => {
        await logout();
        setAuthenticated(false);
        navigate("/");
    };

    return (
        <nav className="nav-bar">
            <Link to={authenticated ? "/main" : "/"} className="site-title">Visited Countries</Link>
            <ul>
                {authenticated ? (
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
