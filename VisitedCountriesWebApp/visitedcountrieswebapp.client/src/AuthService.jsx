import axios  from "axios";

const API_URL = "https://localhost:7225/api/Auth";

// Rejestracja
/*export const register = async (email, password, confirmPassword) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword })
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }
    return await response.json();
};*/

export const register = async (userName, email, password, confirmPassword) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            userName,
            email,
            password,
            confirmPassword
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

// Logowanie
/*export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error("Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
};*/


export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            userName: email,
            email,
            password,
        });

        const data = response.data;
        //localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Invalid credentials" };
    }
};



// Wylogowanie
export const logout = () => {
    localStorage.removeItem("token");
};

// Sprawdzenie, czy u¿ytkownik jest zalogowany
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};
