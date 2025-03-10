// src/App.jsx
import React, { useState } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import { DataProvider } from './contexts/DataContext';
import Timer from './features/timer/Timer';
import SettingsPanel from './features/settings/SettingsPanel';
import Header from './features/layout/Header';
import Footer from './features/layout/Footer';
import DataManager from './features/data/DataManager';
import './assets/transformers-theme.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showDataManager, setShowDataManager] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowDataManager(false);
  };

  const toggleDataManager = () => {
    setShowDataManager(!showDataManager);
    setShowSettings(false);
  };

  return (
    <SettingsProvider>
      <DataProvider>
        <div className="app-container flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
          <Header 
            onSettingsClick={toggleSettings} 
            onDataClick={toggleDataManager}
          />

          <main className="flex-1 p-4 flex flex-col items-center justify-center">
            {showSettings && <SettingsPanel onClose={toggleSettings} />}
            {showDataManager && <DataManager onClose={toggleDataManager} />}
            
            {!showSettings && !showDataManager && (
              <Timer />
            )}
          </main>

          <Footer />
        </div>
      </DataProvider>
    </SettingsProvider>
  );
}

export default App;