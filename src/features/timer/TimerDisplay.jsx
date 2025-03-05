import React from 'react';
import { Clock } from 'lucide-react';

const TimerDisplay = ({ displayOnly = false, initialMinutes = 0, timeRemaining = 0, onTimeInputChange }) => {
  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-4">
      {!displayOnly ? (
        <div>
          <label className="block mb-2 text-lg">Set Timer (minutes):</label>
          <input
            type="number"
            min="1"
            value={initialMinutes}
            onChange={(e) => onTimeInputChange(parseInt(e.target.value) || 0)}
            className="w-full p-3 bg-gray-700 rounded text-2xl text-center"
          />
        </div>
      ) : (
        <div className="text-center my-6">
          <div className="flex justify-center items-center mb-4">
            <Clock size={32} className="mr-2" />
            <span className="text-5xl font-bold">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerDisplay;