// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Available themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
  FOCUS: 'focus',
  CALM: 'calm',
  FOREST: 'forest'
};

// Create context
const ThemeContext = createContext();

// Custom hook for using theme context
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider component
export function ThemeProvider({ children }) {
  const savedTheme = localStorage.getItem('theme') || THEMES.SYSTEM;
  const [theme, setThemeState] = useState(savedTheme);
  
  // Update localStorage and apply theme
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // First remove all possible theme classes
    root.classList.remove('light', 'dark', 'focus', 'calm', 'forest');
    
    // Apply the selected theme
    if (theme === THEMES.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 
        'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Apply additional theme CSS variables
    root.style.setProperty('--color-primary', getThemeColors(theme).primary);
    root.style.setProperty('--color-secondary', getThemeColors(theme).secondary);
    root.style.setProperty('--color-accent', getThemeColors(theme).accent);
  }, [theme]);
  
  // Helper to get theme colors
  const getThemeColors = (currentTheme) => {
    switch(currentTheme) {
      case THEMES.FOCUS:
        return {
          primary: '#ff5252',
          secondary: '#ffecb3',
          accent: '#ff8a80'
        };
      case THEMES.CALM:
        return {
          primary: '#4fc3f7',
          secondary: '#b3e5fc',
          accent: '#29b6f6'
        };
      case THEMES.FOREST:
        return {
          primary: '#66bb6a',
          secondary: '#c8e6c9',
          accent: '#43a047'
        };
      case THEMES.DARK:
        return {
          primary: '#bb86fc',
          secondary: '#03dac6',
          accent: '#cf6679'
        };
      case THEMES.LIGHT:
      case THEMES.SYSTEM:
      default:
        return {
          primary: '#1a73e8',
          secondary: '#e8f0fe',
          accent: '#ea4335'
        };
    }
  };
  
  // Context value
  const value = {
    theme,
    setTheme,
    themeColors: getThemeColors(theme)
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}