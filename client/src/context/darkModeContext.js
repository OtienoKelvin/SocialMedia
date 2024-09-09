import { createContext, useEffect, useState } from "react";

// Create a context for Dark Mode
export const DarkModeContext = createContext();

// Create a provider component for Dark Mode context
export const DarkModeContextProvider = ({ children }) => {
    // Correctly destructure useState
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    );

    // Function to toggle dark mode
    const toggle = () => {
        setDarkMode(!darkMode);
    };

    // Use useEffect to update local storage whenever darkMode changes
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    // Provide the darkMode state and toggle function to children components
    return (
        <DarkModeContext.Provider value={{ darkMode, toggle }}>
            {children}
        </DarkModeContext.Provider>
    );
};
