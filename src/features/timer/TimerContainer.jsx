import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import { useTheme } from '../settings/ThemeContext';
import SettingsPanel from '../settings/SettingsPanel';
import ProgressIndicator from '../progress/ProgressIndicator';
import CompletionMessage from '../rewards/CompletionMessage';
import StreakCounter from '../streak/StreakCounter';
import { playNotificationSound } from '../notifications/NotificationService';
import { updateStreak } from '../streak/StreakService';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const TimerContainer = () => {
  const { themeColors } = useTheme();
  
  const [timerState, setTimerState] = useState({
    timeRemaining: 0,
    initialTime: 0,
    isRunning: false,
    isComplete: false,
  });
  
  const [showSettings, setShowSettings] = useState(false);

  // Use effects hook to handle timer countdown
  useEffect(() => {
    let interval = null;
    
    if (timerState.isRunning && timerState.timeRemaining > 0) {
      interval = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (timerState.isRunning && timerState.timeRemaining === 0) {
      // Timer completed
      playNotificationSound();
      updateStreak();
      setTimerState(prev => ({
        ...prev,
        isRunning: false,
        isComplete: true
      }));
    }
    
    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.timeRemaining]);

  // Timer action handlers
  const startTimer = () => {
    if (timerState.initialTime > 0) {
      setTimerState(prev => ({
        ...prev,
        timeRemaining: prev.initialTime,
        isRunning: true,
        isComplete: false
      }));
    }
  };

  const pauseTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false
    }));
  };

  const resetTimer = () => {
    setTimerState(prev => ({
      ...prev,
      timeRemaining: prev.initialTime,
      isRunning: false,
      isComplete: false
    }));
  };
  
  const handleTimeInputChange = (minutes) => {
    setTimerState(prev => ({
      ...prev,
      initialTime: minutes * 60,
      timeRemaining: minutes * 60
    }));
  };

  // Calculate progress percentage
  const progressPercentage = timerState.initialTime === 0 ? 0 : 
    ((timerState.initialTime - timerState.timeRemaining) / timerState.initialTime) * 100;

  return (
    <div className={`flex flex-col h-screen ${themeColors.secondary} text-white`}>
      <Header 
        onSettingsClick={() => setShowSettings(!showSettings)} 
      />

      <main className="flex-1 p-4 flex flex-col items-center justify-center">
        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}

        <div className={`w-full max-w-md p-6 rounded-lg border-4 ${themeColors.accent} ${themeColors.secondary} mb-8`}>
          {!timerState.isRunning && !timerState.isComplete && (
            <TimerDisplay 
              initialMinutes={timerState.initialTime / 60}
              onTimeInputChange={handleTimeInputChange}
              timeRemaining={timerState.timeRemaining}
            />
          )}
          
          {(timerState.isRunning || timerState.timeRemaining !== timerState.initialTime) && (
            <TimerDisplay 
              displayOnly={true}
              timeRemaining={timerState.timeRemaining}
            />
          )}
          
          <ProgressIndicator percentage={progressPercentage} />
          
          <TimerControls 
            isRunning={timerState.isRunning}
            hasTimeSet={timerState.initialTime > 0}
            timeRemaining={timerState.timeRemaining}
            initialTime={timerState.initialTime}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
          />
        </div>
        
        {timerState.isComplete && (
          <CompletionMessage minutes={timerState.initialTime / 60} />
        )}
        
        <StreakCounter />
      </main>
      
      <Footer />
    </div>
  );
};

export default TimerContainer;