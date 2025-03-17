import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {login}  from "./AuthService";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(email, password);
            setMessage("Login successful!");      
            navigate("/main");
            window.location.reload();
        } catch (error) {
            setMessage(error.message);
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
                className="form-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
            />
            <button onClick={handleLogin} className="form-button">Login</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginPage;
