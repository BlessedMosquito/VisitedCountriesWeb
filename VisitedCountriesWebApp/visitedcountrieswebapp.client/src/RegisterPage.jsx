import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register}  from "./AuthService";

function RegisterPage() {
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await register(userName, email, password, confirmPassword);
            setMessage("Registration successful!");
            navigate("/login");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="form-container">
            <h1>Register</h1>
            <input
                type="userName"
                placeholder="UserName"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
            />
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
            <input
                type="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
            />
            <button onClick={handleRegister} className="form-button">Register</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterPage;
