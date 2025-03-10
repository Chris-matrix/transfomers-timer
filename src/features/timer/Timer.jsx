import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '.../contexts/SettingsContext';
import { useData } from '.../contexts/DataContext';
import { Play, Pause, RotateCcw, ChevronDown } from 'lucide-react';

const Timer = () => {
  const { settings } = useSettings();
  const { addSession } = useData();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('pomodoro');
  const [isBreak, setIsBreak] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const audioRef = useRef(null);

  // Initialize timer with preset
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(settings.presets[selectedPreset] * 60);
    }
  }, [selectedPreset, settings.presets, isActive]);

  // Timer logic
  useEffect(() => {
    let interval = null;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            clearInterval(interval);
            handleTimerComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const handleTimerComplete = () => {
    if (settings.soundEnabled && audioRef.current) {
      audioRef.current.play();
    }
    
    // Calculate session duration
    const sessionDuration = isBreak ? 
      settings.presets.break * 60 : 
      settings.presets[selectedPreset] * 60;
    
    // Record session in analytics
    addSession({
      type: isBreak ? 'break' : selectedPreset,
      duration: sessionDuration,
      date: new Date().toISOString(),
      completed: true,
      paused: isPaused
    });
    
    setIsActive(false);
    
    // If it was a focus session, ask if user wants to start a break
    if (!isBreak) {
      // Auto switch to break timer
      setIsBreak(true);
      setTimeLeft(settings.presets.break * 60);
    } else {
      // If it was a break, go back to focus mode
      setIsBreak(false);
    }
  };

  const startTimer = () => {
    if (!isActive) {
      setSessionStartTime(new Date());
    }
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    if (isActive) {
      // Record incomplete session
      const sessionDuration = Math.floor(
        (new Date() - new Date(sessionStartTime)) / 1000
      );
      
      addSession({
        type: isBreak ? 'break' : selectedPreset,
        duration: sessionDuration,
        date: new Date().toISOString(),
        completed: false,
        paused: isPaused
      });
    }
    
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(settings.presets[selectedPreset] * 60);
    setIsBreak(false);
  };

  const selectPreset = (preset) => {
    setSelectedPreset(preset);
    setShowPresets(false);
    resetTimer();
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const totalSeconds = isBreak ? 
      settings.presets.break * 60 : 
      settings.presets[selectedPreset] * 60;
    return (timeLeft / totalSeconds) * 100;
  };

  const getThemeClass = () => {
    switch(settings.theme) {
      case 'optimus':
        return 'bg-red-500 border-blue-500';
      case 'megatron':
        return 'bg-purple-500 border-gray-700';
      case 'bumblebee':
        return 'bg-yellow-400 border-black';
      default:
        return 'bg-red-500 border-blue-500';
    }
  };

  return (
    <div className={`timer-container max-w-md mx-auto p-6 rounded-lg shadow-lg border-4 ${getThemeClass()} text-white`}>
      <audio 
        ref={audioRef} 
        src={`/alarm.mp3`} 
        preload="auto" 
      />
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </h2>
        
        <div className="relative">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-md"
            onClick={() => setShowPresets(!showPresets)}
          >
            {selectedPreset.charAt(0).toUpperCase() + selectedPreset.slice(1)}
            <ChevronDown size={16} />
          </button>
          
          {showPresets && (
            <div className="absolute right-0 top-full mt-2 bg-white bg-opacity-90 text-gray-800 rounded-md shadow-lg p-2 z-10">
              <button 
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md"
                onClick={() => selectPreset('pomodoro')}
              >
                Pomodoro ({settings.presets.pomodoro} min)
              </button>
              <button 
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md"
                onClick={() => selectPreset('shortFocus')}
              >
                Short Focus ({settings.presets.shortFocus} min)
              </button>
              <button 
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md"
                onClick={() => selectPreset('custom')}
              >
                Custom ({settings.presets.custom} min)
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="timer-progress h-4 bg-white bg-opacity-20 rounded-full mb-4">
        <div 
          className="h-full bg-white rounded-full transition-all duration-1000"
          style={{ width: `${calculateProgress()}%` }}
        />
      </div>
      
      <div className="timer-display text-center mb-8">
        <div className="text-7xl font-bold">{formatTime(timeLeft)}</div>
      </div>
      
      <div className="timer-controls flex justify-center gap-4">
        {!isActive ? (
          <button 
            className="rounded-full p-4 bg-white bg-opacity-20 hover:bg-opacity-30 transition"
            onClick={startTimer}
          >
            <Play size={24} />
          </button>
        ) : (
          <>
            <button 
              className="rounded-full p-4 bg-white bg-opacity-20 hover:bg-opacity-30 transition"
              onClick={pauseTimer}
            >
              <Pause size={24} />
            </button>
          </>
        )}
        
        <button 
          className="rounded-full p-4 bg-white bg-opacity-20 hover:bg-opacity-30 transition"
          onClick={resetTimer}
        >
          <RotateCcw size={24} />
        </button>
      </div>
      
      {isBreak && (
        <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md transition"
            onClick={() => {
              setIsBreak(false);
              resetTimer();
            }}
          >
            Skip Break
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;