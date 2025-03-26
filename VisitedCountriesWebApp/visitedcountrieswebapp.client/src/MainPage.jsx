import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import {isAuthenticated} from "./AuthService";

export default function MainPage() {
    const [username, setUsername] = useState("");
 
    const navigate = useNavigate();

    const searchRoute = () => {
        navigate("/search");
    };

    const tableRoute = () => {
        navigate("/table");
    }

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            if (result) {
                const usernameResult = await getUsername();
                if (usernameResult) {
                    setUsername(usernameResult);
                }
            }
        };


        checkAuth();
    }, []); 



    return (
        <div>
            <h1>Welcome, {username ? username : "User"}</h1>
            <button onClick={searchRoute}>Search</button>
            <button onClick={tableRoute}>Table</button>
        </div>
    );
}

export const getUsername = async () => {
    try {
        const response = await axios.get("https://localhost:7225/api/user/username", { withCredentials: true });
        console.log(response.data);
        return response.data.username;
    } catch (error) {
        console.error("Error getting username", error);
        return false;
    }

};
