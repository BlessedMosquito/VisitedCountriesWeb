import axios  from "axios";

const API_URL = "https://localhost:7225/api/Auth";


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


export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            userName: email,
            email,
            password,
        });

        const data = response.data;
        localStorage.setItem("token", data.token);
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
