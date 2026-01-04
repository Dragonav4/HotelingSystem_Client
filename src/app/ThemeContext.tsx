import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, type PaletteMode, type ThemeOptions } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface ColorModeContextType {
    toggleColorMode: () => void;
    mode: PaletteMode;
}

const ColorModeContext = createContext<ColorModeContextType>({
    toggleColorMode: () => {},
    mode: 'light',
});

export const useColorMode = () => useContext(ColorModeContext);
const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: { main: '#1976d2' },
                secondary: { main: '#9c27b0' },
            }
            : {
                primary: { main: '#90caf9' },
                secondary: { main: '#ce93d8' },
                background: { default: '#121212', paper: '#1e1e1e' },
            }),
    },
});

const useThemeManager = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [mode, setMode] = useState<PaletteMode>(() => {
        const savedMode = localStorage.getItem('themeMode');
        if (savedMode === 'light' || savedMode === 'dark') return savedMode;
        return prefersDarkMode ? 'dark' : 'light';
    });

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return { mode, toggleColorMode };
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { mode, toggleColorMode } = useThemeManager();

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    const contextValue = useMemo(() => ({ mode, toggleColorMode }), [mode]);

    return (
        <ColorModeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};