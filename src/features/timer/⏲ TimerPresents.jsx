// src/features/settings/TimerPresets.jsx
import React, { useState } from 'react';
import { useSettings } from './SettingsContext';
import { Clock, Clock4, Coffee } from 'lucide-react';

const TimerPresets = () => {
  const { settings, updatePreset } = useSettings();
  const [presetValues, setPresetValues] = useState({
    pomodoro: settings.presets.pomodoro,
    shortFocus: settings.presets.shortFocus,
    custom: settings.presets.custom,
    break: settings.presets.break
  });

  const handleInputChange = (preset, value) => {
    // Ensure value is a number and within reasonable bounds
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    if (numValue > 0 && numValue <= 120) {
      setPresetValues({
        ...presetValues,
        [preset]: numValue
      });
    }
  };

  const savePreset = (preset) => {
    updatePreset(preset, presetValues[preset]);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Timer Presets</h3>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock size={20} className="text-red-500 mr-2" />
            <h4 className="font-medium text-gray-800">Pomodoro</h4>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              max="120"
              value={presetValues.pomodoro}
              onChange={(e) => handleInputChange('pomodoro', e.target.value)}
              className="border rounded-md px-3 py-2 w-20 mr-2 text-gray-700"
            />
            <span className="text-gray-600 mr-auto">minutes</span>
            <button
              onClick={() => savePreset('pomodoro')}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Classic pomodoro technique for focused work sessions
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock4 size={20} className="text-yellow-500 mr-2" />
            <h4 className="font-medium text-gray-800">Short Focus</h4>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              max="120"
              value={presetValues.shortFocus}
              onChange={(e) => handleInputChange('shortFocus', e.target.value)}
              className="border rounded-md px-3 py-2 w-20 mr-2 text-gray-700"
            />
            <span className="text-gray-600 mr-auto">minutes</span>
            <button
              onClick={() => savePreset('shortFocus')}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Shorter sessions for quick tasks or limited attention spans
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock size={20} className="text-green-500 mr-2" />
            <h4 className="font-medium text-gray-800">Custom</h4>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              max="120"
              value={presetValues.custom}
              onChange={(e) => handleInputChange('custom', e.target.value)}
              className="border rounded-md px-3 py-2 w-20 mr-2 text-gray-700"
            />
            <span className="text-gray-600 mr-auto">minutes</span>
            <button
              onClick={() => savePreset('custom')}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Your own custom timer length for personal preference
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Coffee size={20} className="text-blue-500 mr-2" />
            <h4 className="font-medium text-gray-800">Break</h4>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              max="60"
              value={presetValues.break}
              onChange={(e) => handleInputChange('break', e.target.value)}
              className="border rounded-md px-3 py-2 w-20 mr-2 text-gray-700"
            />
            <span className="text-gray-600 mr-auto">minutes</span>
            <button
              onClick={() => savePreset('break')}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Rest period between focus sessions to recharge
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimerPresets;