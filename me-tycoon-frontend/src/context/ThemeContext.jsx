import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeClass, setThemeClass] = useState("theme-classic");

    return (
        <ThemeContext.Provider value={{ themeClass, setThemeClass }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);