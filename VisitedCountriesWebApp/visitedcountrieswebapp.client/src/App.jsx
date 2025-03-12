import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> { }
                <Route path="/register" element={<RegisterPage />} /> { }
                <Route path="/login" element={<LoginPage />} /> { }
            </Routes>
        </Router>
    );
}

export default App;