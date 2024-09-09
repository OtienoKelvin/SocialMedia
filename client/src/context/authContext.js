import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create a context for authentication
export const AuthContext = createContext();

// Create a provider component for Dark Mode context
export const AuthContextProvider = ({ children }) => {
    // Correctly destructure useState
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Function to login
    const login = async (inputs) => {
        const res = await axios.post("http://localhost:5000/api/auth/login", inputs, {
            withCredentials: true,
        });

        setCurrentUser(res.data);
    };

    // Use useEffect to update local storage whenever darkMode changes
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    // Provide the darkMode state and toggle function to children components
    return (
        <AuthContext.Provider value={{ currentUser, login, }}>
            {children}
        </AuthContext.Provider>
    );
};
