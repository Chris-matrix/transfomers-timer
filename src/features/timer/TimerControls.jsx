import React from 'react';
import { useTheme } from '../settings/ThemeContext';

const TimerControls = ({ isRunning, hasTimeSet, timeRemaining, initialTime, onStart, onPause, onReset }) => {
  const { themeColors } = useTheme();

  return (
    <div className="flex justify-center space-x-4">
      {!isRunning && (
        <button
          onClick={onStart}
          disabled={!hasTimeSet}
          className={`px-6 py-3 rounded-lg font-bold ${themeColors.primary} hover:opacity-90 disabled:opacity-50`}
        >
          {timeRemaining < initialTime ? "Resume" : "Start"}
        </button>
      )}
      
      {isRunning && (
        <button
          onClick={onPause}
          className={`px-6 py-3 rounded-lg font-bold bg-yellow-500 hover:opacity-90`}
        >
          Pause
        </button>
      )}
      
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-lg font-bold bg-gray-600 hover:opacity-90"
      >
        Reset
      </button>
    </div>
  );
};

export default TimerControls;
