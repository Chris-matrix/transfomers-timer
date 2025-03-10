import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSettings } from './SettingsContext';
import { useData } from './DataContext';

export const TIMER_STATES = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  BREAK: 'break',
  COMPLETED: 'completed',
};

const defaultTimerContext = {
  timerState: TIMER_STATES.IDLE,
  currentTime: 0,
  initialTime: 0,
  isBreakTime: false,
  activePreset: 'pomodoro',
  sessionsCompleted: 0,
  soundEnabled: true,
  plannedSessions: 4,
  sessionProgress: 0,
  progress: 0,
};

const TimerContext = createContext(defaultTimerContext);

export const TimerProvider = ({ children }) => {
  const { settings } = useSettings();
  const { addSession } = useData();

  const [timerState, setTimerState] = useState(TIMER_STATES.IDLE);
  const [currentTime, setCurrentTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [activePreset, setActivePreset] = useState('pomodoro');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [plannedSessions, setPlannedSessions] = useState(4);
  const [sessionProgress, setSessionProgress] = useState(0);

  const timerRef = useRef(null);

  const sounds = {
    timerComplete: '/sounds/energon-cube.mp3',
    timerTick: '/sounds/transformer-tick.mp3',
    breakStart: '/sounds/autobots-assemble.mp3',
  };

  useEffect(() => {
    const preset = settings?.timerPresets?.[activePreset];
    if (preset) {
      const minutes = isBreakTime ? preset.break : preset.work;
      const seconds = minutes * 60;
      setInitialTime(seconds);
      setCurrentTime(seconds);
    }
  }, [activePreset, isBreakTime, settings?.timerPresets]);

  useEffect(() => {
    if (timerState === TIMER_STATES.RUNNING) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimerComplete();
            return 0;
          }

          if (prev % 60 === 0 && prev > 0) {
            playSound('timerTick');
          }

          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerState]);

  const handleTimerComplete = () => {
    const soundType = isBreakTime ? 'timerComplete' : 'breakStart';
    playSound(soundType);

    if (!isBreakTime) {
      addSession({
        type: activePreset,
        duration: initialTime,
        completed: true,
      });

      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);
      setSessionProgress((newSessionsCompleted / plannedSessions) * 100);

      if (newSessionsCompleted >= plannedSessions) {
        notifyUser('All planned sessions completed!', 'Great job! You\'ve completed your focus work.');
      }
    }

    setIsBreakTime((prev) => !prev);
    setTimerState(TIMER_STATES.IDLE);
  };

  const playSound = (type) => {
    if (!soundEnabled || !settings?.sounds?.[type]?.enabled) return;

    const soundPath = sounds[type];
    if (soundPath) {
      const audio = new Audio(soundPath);
      audio.volume = settings.sounds[type]?.volume || 0.7;
      audio.currentTime = 0;
      audio.play().catch((err) => console.error('Error playing sound:', err));
    }
  };

  const notifyUser = (title, body) => {
    if (!settings?.notifications?.enabled) return;

    if (typeof Notification !== 'undefined') {
      if (Notification.permission === 'granted') {
        new Notification(title, { body });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(title, { body });
          }
        });
      }
    } else {
      console.warn('Browser does not support notifications.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = initialTime > 0 ? ((initialTime - currentTime) / initialTime) * 100 : 0;

  return (
    <TimerContext.Provider
      value={{
        timerState,
        currentTime,
        initialTime,
        isBreakTime,
        activePreset,
        sessionsCompleted,
        soundEnabled,
        plannedSessions,
        sessionProgress,
        progress,
        startTimer: () => setTimerState(TIMER_STATES.RUNNING),
        pauseTimer: () => setTimerState(TIMER_STATES.PAUSED),
        resetTimer: () => {
          setTimerState(TIMER_STATES.IDLE);
          setCurrentTime(initialTime);
        },
        skipToNext: () => {
          setTimerState(TIMER_STATES.IDLE);
          setIsBreakTime((prev) => !prev);
        },
        changePreset: (presetName) => setActivePreset(presetName),
        toggleSound: () => setSoundEnabled((prev) => !prev),
        setPlannedSessionsCount: (count) => setPlannedSessions(count),
        formatTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
