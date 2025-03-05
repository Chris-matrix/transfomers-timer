import React, { createContext, useContext, useState } from 'react';
import { getSettings, saveSettings } from './SettingsService';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => getSettings());
  
  // Get theme colors based on selected theme
  const getThemeColors = () => {
    switch(settings.theme) {
      case 'autobots':
        return {
          primary: 'bg-red-600',
          secondary: 'bg-blue-500',
          text: 'text-yellow-400',
          accent: 'border-yellow-400'
        };
      case 'decepticons':
        return {
          primary: 'bg-purple-700',
          secondary: 'bg-gray-800',
          text: 'text-gray-300',
          accent: 'border-purple-400'
        };
      case 'bumblebee':
        return {
          primary: 'bg-yellow-400',
          secondary: 'bg-black',
          text: 'text-black',
          accent: 'border-yellow-500'
        };
      default:
        return {
          primary: 'bg-red-600',
          secondary: 'bg-blue-500',
          text: 'text-yellow-400',
          accent: 'border-yellow-400'
        };
    }
  };

  // Update settings and save to localStorage
  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };
  
  return (
    <ThemeContext.Provider 
      value={{
        theme: settings.theme,
        notificationSound: settings.notificationSound,
        notificationEnabled: settings.notificationEnabled,
        themeColors: getThemeColors(),
        updateSettings
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};