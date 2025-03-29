import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register}  from "./AuthService";

function RegisterPage() {
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true);
        setError(null);
        try {
            await register(userName, email, password, confirmPassword);
            navigate("/login");
        } catch (error) {
            console.log(error.message);
            setError("An error occurred. Please try again.");
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h1>Register</h1>
            <input
                type="text"
                placeholder="UserName"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                className={`form-input ${loading ? 'hidden' : ''}`}
            />
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-input ${loading ? 'hidden' : ''}`}
            />

            {loading ? (
                <div className="random-spinner"></div>
            ) : (
                <button onClick={handleRegister} className="form-button">Register</button>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default RegisterPage;
