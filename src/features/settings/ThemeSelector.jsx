// src/features/settings/SettingsPanel.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSettings } from './SettingsContext';
import ThemeSelector from './ThemeSelector';
import TimerPresets from './TimerPresets';
import NotificationSettings from './NotificationSettings';

const SettingsPanel = ({ onClose }) => {
  const { themeClasses } = useSettings();
  const [activeTab, setActiveTab] = useState('theme');

  return (
    <div className="max-w-md w-full mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700 animate-in">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <span className="mr-2">⚙️</span> Settings
        </h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-700 transition"
          aria-label="Close settings"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex border-b border-gray-700">
        {['theme', 'timer', 'notifications'].map((tab) => (
          <button 
            key={tab}
            className={`flex-1 py-3 px-4 font-medium transition ${
              activeTab === tab 
              ? `${themeClasses.primary} text-white` 
              : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-6 max-h-[60vh] overflow-y-auto">
        {activeTab === 'theme' && <ThemeSelector />}
        {activeTab === 'timer' && <TimerPresets />}
        {activeTab === 'notifications' && <NotificationSettings />}
      </div>

      <div className="p-4 bg-gray-900 text-center">
        <button 
          onClick={onClose}
          className={`px-8 py-2 rounded-md ${themeClasses.button} transform transition hover:scale-105 active:scale-95`}
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;