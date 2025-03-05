import React from 'react';
import { useTheme } from './ThemeContext';

const SettingsPanel = ({ onClose }) => {
  const { theme, notificationSound, notificationEnabled, updateSettings } = useTheme();

  return (
    <div className="w-full max-w-md mb-8 p-4 rounded-lg bg-gray-800 border-2 border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Settings</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          &times;
        </button>
      </div>
      
      {/* Theme Selection */}
      <div className="mb-4">
        <label className="block mb-2">Theme:</label>
        <select
          value={theme}
          onChange={(e) => updateSettings({ theme: e.target.value })}
          className="w-full p-2 bg-gray-700 rounded"
        >
          <option value="autobots">Autobots</option>
          <option value="decepticons">Decepticons</option>
          <option value="bumblebee">Bumblebee</option>
        </select>
      </div>
      
      {/* Notification Sound */}
      <div className="mb-4">
        <label className="block mb-2">Notification Sound:</label>
        <select
          value={notificationSound}
          onChange={(e) => updateSettings({ notificationSound: e.target.value })}
          className="w-full p-2 bg-gray-700 rounded"
        >
          <option value="optimusPrime">Optimus Prime</option>
          <option value="bumblebee">Bumblebee</option>
          <option value="megatron">Megatron</option>
        </select>
      </div>
      
      {/* Notification Toggle */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="notificationToggle"
          checked={notificationEnabled}
          onChange={() => updateSettings({ notificationEnabled: !notificationEnabled })}
          className="mr-2"
        />
        <label htmlFor="notificationToggle">Enable Notifications</label>
      </div>
    </div>
  );
};

export default SettingsPanel;