import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "./AuthService";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import NavBar from "./NavBar";
import TablePage from "./TablePage";
import SearchPage from "./SearchPage";
import PrivateRoute from "./PrivateRoute";

function App() {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            setAuthenticated(result);
        };

        checkAuth();
    }, []);

    if (authenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/main"
                    element={
                        <PrivateRoute authenticated={authenticated}>
                            <MainPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <PrivateRoute authenticated={authenticated}>
                            <SearchPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/table"
                    element={
                        <PrivateRoute authenticated={authenticated}>
                            <TablePage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
