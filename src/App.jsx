// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider } from './features/settings/SettingsContext';
import { DataProvider } from './features/data/DataContext';
import TimerContainer from './features/timer/TimerContainer';
import SettingsPanel from './features/settings/SettingsPanel';
import DataManager from './features/data/DataManager';
import Header from './features/layout/Header';
import Footer from './features/layout/Footer';
import './assets/transformers-theme.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showDataManager, setShowDataManager] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (showDataManager) setShowDataManager(false);
  };

  const toggleDataManager = () => {
    setShowDataManager(!showDataManager);
    if (showSettings) setShowSettings(false);
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <Header 
            onSettingsClick={toggleSettings} 
            onDataClick={toggleDataManager}
          />
          
          <main className="flex-1 px-4 py-8 flex flex-col items-center justify-center">
            {showSettings ? (
              <SettingsPanel onClose={toggleSettings} />
            ) : showDataManager ? (
              <DataManager onClose={toggleDataManager} />
            ) : (
              <TimerContainer />
            )}
          </main>
          
          <Footer />
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;