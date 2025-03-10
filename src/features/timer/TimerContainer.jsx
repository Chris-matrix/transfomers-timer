// src/features/timer/TimerContainer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '../settings/SettingsContext';
import { useData } from '../data/DataContext';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import ProgressIndicator from '../progress/ProgressIndicator';
import CompletionMessage from '../rewards/CompletionMessage';
import { ChevronDown, Coffee } from 'lucide-react';

const TimerContainer = () => {
  const { settings, themeClasses } = useSettings();
  const { addSession } = useData();
  
  // Timer state
  const [timerState, setTimerState] = useState({
    timeRemaining: 25 * 60, // Default to pomodoro time (25 min)
    initialTime: 25 * 60,
    isRunning: false,
    isPaused: false,
    isComplete: false,
  });
  
  // UI state
  const [selectedPreset, setSelectedPreset] = useState('pomodoro');
  const [isBreak, setIsBreak] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [completedSessionData, setCompletedSessionData] = useState(null);
  
  // Audio ref for sound effect
  const audioRef = useRef(null);

  // Initialize timer with preset when settings change
  useEffect(() => {
    if (!timerState.isRunning) {
      const presetMinutes = isBreak ? settings.presets.break : settings.presets[selectedPreset];
      const seconds = presetMinutes * 60;
      setTimerState(prev => ({
        ...prev,
        timeRemaining: seconds,
        initialTime: seconds
      }));
    }
  }, [selectedPreset, settings.presets, isBreak, timerState.isRunning]);

  // Timer countdown logic
  useEffect(() => {
    let interval = null;
    
    if (timerState.isRunning && !timerState.isPaused) {
      interval = setInterval(() => {
        setTimerState(prev => {
          if (prev.timeRemaining <= 1) {
            clearInterval(interval);
            handleTimerComplete();
            return {
              ...prev,
              timeRemaining: 0,
              isRunning: false,
              isComplete: true
            };
          }
          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1
          };
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.isPaused]);

  const handleTimerComplete = () => {
    // Play sound if enabled
    if (settings.soundEnabled && audioRef.current) {
      audioRef.current.play().catch(err => console.error("Audio playback error:", err));
    }
    
    // Create session data
    const sessionData = {
      type: isBreak ? 'break' : selectedPreset,
      duration: timerState.initialTime,
      completed: true,
      paused: timerState.isPaused
    };
    
    // Record session in analytics
    addSession(sessionData);
    
    // Show completion message if it's not a break
    if (!isBreak) {
      setCompletedSessionData(sessionData);
      setShowCompletionMessage(true);
    }
    
    // Auto switch to break timer after focus session
    if (!isBreak) {
      setIsBreak(true);
      const breakTime = settings.presets.break * 60;
      setTimerState(prev => ({
        ...prev,
        initialTime: breakTime,
        timeRemaining: breakTime,
        isComplete: false
      }));
    } else {
      // If it was a break, go back to focus mode
      setIsBreak(false);
      const focusTime = settings.presets[selectedPreset] * 60;
      setTimerState(prev => ({
        ...prev,
        initialTime: focusTime,
        timeRemaining: focusTime,
        isComplete: false
      }));
    }
  };

  const startTimer = () => {
    setSessionStartTime(new Date());
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      isComplete: false
    }));
  };

  const pauseTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isPaused: true
    }));
  };

  const resetTimer = () => {
    if (timerState.isRunning) {
      // Record incomplete session
      const sessionDuration = Math.floor(
        (new Date() - new Date(sessionStartTime)) / 1000
      );
      
      addSession({
        type: isBreak ? 'break' : selectedPreset,
        duration: sessionDuration,
        completed: false,
        paused: timerState.isPaused
      });
    }
    
    setTimerState(prev => ({
      ...prev,
      timeRemaining: prev.initialTime,
      isRunning: false,
      isPaused: false,
      isComplete: false
    }));
  };

  const selectPreset = (preset) => {
    setSelectedPreset(preset);
    setShowPresets(false);
    
    if (!timerState.isRunning) {
      const presetTime = settings.presets[preset] * 60;
      setTimerState(prev => ({
        ...prev,
        initialTime: presetTime,
        timeRemaining: presetTime
      }));
    }
  };

  // Skip break timer
  const skipBreak = () => {
    setIsBreak(false);
    const focusTime = settings.presets[selectedPreset] * 60;
    setTimerState(prev => ({
      ...prev,
      initialTime: focusTime,
      timeRemaining: focusTime,
      isRunning: false,
      isPaused: false,
      isComplete: false
    }));
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    return timerState.initialTime === 0 ? 0 : 
      ((timerState.initialTime - timerState.timeRemaining) / timerState.initialTime) * 100;
  };

  // Get audio source based on settings
  const getAudioSrc = () => {
    switch(settings.soundOption) {
      case 'autobots-rollout': return '/alarm.mp3';
      case 'decepticons-attack': return '/alarm.mp3'; 
      case 'energon-cube': return '/alarm.mp3';
      default: return '/alarm.mp3';
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      {showCompletionMessage && (
        <CompletionMessage 
          data={completedSessionData}
          onClose={() => setShowCompletionMessage(false)}
        />
      )}
      
      <audio 
        ref={audioRef} 
        src={getAudioSrc()} 
        preload="auto" 
      />
      
      <div className={`p-6 rounded-lg shadow-lg ${themeClasses.timerBorder} ${themeClasses.timerBg}`}>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {isBreak ? 'Break Time' : 'Focus Time'}
          </h2>
          
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-opacity-20 bg-white rounded-md"
              onClick={() => setShowPresets(!showPresets)}
              aria-expanded={showPresets}
              aria-haspopup="true"
            >
              {selectedPreset.charAt(0).toUpperCase() + selectedPreset.slice(1)}
              <ChevronDown size={16} />
            </button>
            
            {showPresets && (
              <div className="absolute right-0 top-full mt-2 bg-opacity-90 bg-white text-gray-800 rounded-md shadow-lg p-2 z-10">
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
        
        <ProgressIndicator percentage={calculateProgress()} />
        
        <TimerDisplay 
          displayOnly={timerState.isRunning || timerState.timeRemaining !== timerState.initialTime}
          initialMinutes={timerState.initialTime / 60}
          timeRemaining={timerState.timeRemaining}
          onTimeInputChange={(minutes) => {
            const seconds = minutes * 60;
            setTimerState(prev => ({
              ...prev,
              initialTime: seconds,
              timeRemaining: seconds
            }));
          }}
        />
        
        <TimerControls 
          isRunning={timerState.isRunning}
          isPaused={timerState.isPaused}
          hasTimeSet={timerState.initialTime > 0}
          timeRemaining={timerState.timeRemaining}
          initialTime={timerState.initialTime}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
        />
        
        {isBreak && (
          <div className="mt-6 text-center">
            <button 
              className="flex items-center gap-2 mx-auto px-4 py-2 rounded-md bg-opacity-20 bg-white hover:bg-opacity-30 transition"
              onClick={skipBreak}
            >
              <Coffee size={16} />
              Skip Break
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerContainer;