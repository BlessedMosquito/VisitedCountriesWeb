import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./AuthService";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await login(email, password);
            navigate("/main");
            window.location.reload();
        } catch (error) { 
            console.log(error.message);
            setError("An error occurred. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-input ${loading ? 'hidden' : ''}`}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-input ${loading ? 'hidden' : ''}`}
            />
            {loading ? (
                <div className="random-spinner"></div>
            ) : (
                <button onClick={handleLogin} className="form-button">Login</button>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default LoginPage;
