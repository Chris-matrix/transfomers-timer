// src/contexts/SettingsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('transformers_timer_settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      theme: 'optimus', // optimus, megatron, bumblebee
      soundEnabled: true,
      soundOption: 'autobots-rollout', // autobots-rollout, decepticons-attack, energon-cube
      notifications: true,
      presets: {
        pomodoro: 25,
        shortFocus: 10,
        custom: 45,
        break: 5
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('transformers_timer_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  const updatePreset = (presetName, minutes) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      presets: {
        ...prevSettings.presets,
        [presetName]: minutes
      }
    }));
  };

  // Get theme-specific colors and styles
  const getThemeClasses = () => {
    switch(settings.theme) {
      case 'optimus':
        return {
          primary: 'bg-red-600',
          secondary: 'bg-blue-500',
          accent: 'border-yellow-400',
          text: 'text-white',
          button: 'bg-blue-500 hover:bg-blue-600',
          timerBorder: 'border-4 border-blue-500',
          timerBg: 'bg-red-500',
          progressFill: 'bg-blue-500'
        };
      case 'megatron':
        return {
          primary: 'bg-purple-700',
          secondary: 'bg-gray-800',
          accent: 'border-purple-400',
          text: 'text-gray-200',
          button: 'bg-purple-600 hover:bg-purple-700',
          timerBorder: 'border-4 border-purple-500',
          timerBg: 'bg-gray-700',
          progressFill: 'bg-purple-500'
        };
      case 'bumblebee':
        return {
          primary: 'bg-yellow-400',
          secondary: 'bg-black',
          accent: 'border-yellow-500',
          text: 'text-black',
          button: 'bg-yellow-500 hover:bg-yellow-600',
          timerBorder: 'border-4 border-black',
          timerBg: 'bg-yellow-400',
          progressFill: 'bg-black'
        };
      default:
        return {
          primary: 'bg-red-600',
          secondary: 'bg-blue-500',
          accent: 'border-yellow-400',
          text: 'text-white',
          button: 'bg-blue-500 hover:bg-blue-600',
          timerBorder: 'border-4 border-blue-500',
          timerBg: 'bg-red-500',
          progressFill: 'bg-blue-500'
        };
    }
  };

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      updatePreset, 
      themeClasses: getThemeClasses() 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};