// src/features/timer/TimerControls.jsx
import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useSettings } from '../settings/SettingsContext';

const TimerControls = ({ 
  isRunning, 
  isPaused,
  hasTimeSet, 
  timeRemaining, 
  initialTime, 
  onStart, 
  onPause, 
  onReset 
}) => {
  const { themeClasses } = useSettings();

  return (
    <div className="flex justify-center space-x-6 my-6">
      {!isRunning ? (
        <button
          onClick={onStart}
          disabled={!hasTimeSet}
          className={`p-5 rounded-full ${themeClasses.button} disabled:opacity-50 transition transform hover:scale-105 active:scale-95 shadow-lg disabled:cursor-not-allowed`}
          aria-label={timeRemaining < initialTime && timeRemaining > 0 ? "Resume timer" : "Start timer"}
        >
          <Play size={28} />
        </button>
      ) : (
        <>
          {!isPaused ? (
            <button
              onClick={onPause}
              className="p-5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition transform hover:scale-105 active:scale-95 shadow-lg"
              aria-label="Pause timer"
            >
              <Pause size={28} />
            </button>
          ) : (
            <button
              onClick={onStart}
              className={`p-5 rounded-full ${themeClasses.button} transition transform hover:scale-105 active:scale-95 shadow-lg`}
              aria-label="Resume timer"
            >
              <Play size={28} />
            </button>
          )}
        </>
      )}
      
      <button
        onClick={onReset}
        className="p-5 rounded-full bg-gray-600 hover:bg-gray-700 transition transform hover:scale-105 active:scale-95 shadow-lg"
        aria-label="Reset timer"
      >
        <RotateCcw size={28} />
      </button>
    </div>
  );
};

export default TimerControls;