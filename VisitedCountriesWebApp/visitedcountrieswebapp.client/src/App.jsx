import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";
import NavBar from "./NavBar";
import PrivateRoute from "./PrivateRoute";
import {AuthProvider} from "./AuthContext";

function App() {
    return (
        <AuthProvider>
        <Router>
            <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/search" element={<SearchPage />} />
                </Routes>
            </Router>
        </AuthProvider>

    );
}

export default App;
