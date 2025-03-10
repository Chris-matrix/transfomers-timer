// src/features/timer/TimerDisplay.jsx
import React from 'react';
import { Clock } from 'lucide-react';

const TimerDisplay = ({ 
  displayOnly = false, 
  initialMinutes = 0, 
  timeRemaining = 0, 
  onTimeInputChange 
}) => {
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle input change with validation
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      // Convert to number, if empty string use 0
      const numValue = value === '' ? 0 : parseInt(value);
      // Limit to reasonable values (1-180 minutes)
      if (numValue <= 180) {
        onTimeInputChange(numValue);
      }
    }
  };

  return (
    <div className="text-center my-4">
      {!displayOnly ? (
        <div>
          <label className="block mb-2 text-lg">Set Timer (minutes):</label>
          <input
            type="number"
            min="1"
            max="180"
            value={initialMinutes || ''}
            onChange={handleInputChange}
            className="w-full p-3 bg-opacity-20 bg-white rounded text-2xl text-center text-white"
            placeholder="Enter minutes"
          />
        </div>
      ) : (
        <div className="text-center my-6">
          <div className="flex justify-center items-center">
            <Clock size={32} className="mr-2" />
            <span className="text-6xl font-bold font-mono">
              {formatTime(timeRemaining)}
            </span>
          </div>
          {timeRemaining > 0 && (
            <p className="text-sm mt-2 opacity-70">
              {Math.floor(timeRemaining / 60)} minute{Math.floor(timeRemaining / 60) !== 1 ? 's' : ''} remaining
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimerDisplay;