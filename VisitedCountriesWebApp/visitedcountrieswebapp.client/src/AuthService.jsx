import axios from "axios";

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
        }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Invalid credentials" };
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error("Logout failed", error);
    }
};

export const isAuthenticated = async () => {
    try {
        const response = await axios.get(`${API_URL}/authenticated`, { withCredentials: true });
        return response.data.isAuthenticated;
    } catch (error) {
        console.error("Error checking authentication", error);
        return false;
    }
};
