import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("https://localhost:7225/api/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.text();
                const jsonData = data ? JSON.parse(data) : {};
                setMessage(jsonData.message);
                navigate("/main");
            } else {
                const errorData = await response.text();
                const errorJsonData = errorData ? JSON.parse(errorData) : {};
                setMessage(errorJsonData.message || "Something went wrong");
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };


    return (
        <div className="form-container">
            <h1>Login</h1>
            <div>
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
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterPage;