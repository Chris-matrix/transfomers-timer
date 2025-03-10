// src/contexts/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Sessions history
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem('transformers_timer_sessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  // Analytics data
  const [analytics, setAnalytics] = useState(() => {
    const savedAnalytics = localStorage.getItem('transformers_timer_analytics');
    return savedAnalytics ? JSON.parse(savedAnalytics) : {
      totalFocusTime: 0,
      totalSessions: 0,
      completedSessions: 0,
      pausedSessions: 0,
      achievements: []
    };
  });

  // Streak tracking
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem('transformers_timer_streak');
    return savedStreak ? JSON.parse(savedStreak) : {
      current: 0,
      best: 0,
      lastDate: null
    };
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('transformers_timer_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('transformers_timer_analytics', JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    localStorage.setItem('transformers_timer_streak', JSON.stringify(streak));
  }, [streak]);

  // Add a new session to history
  const addSession = (session) => {
    const newSession = {
      ...session,
      id: Date.now(),
      date: new Date().toISOString()
    };
    
    setSessions(prev => [newSession, ...prev]);
    updateAnalytics(newSession);
    updateStreak(newSession.completed);
  };

  // Update analytics based on session data
  const updateAnalytics = (session) => {
    setAnalytics(prev => ({
      ...prev,
      totalFocusTime: prev.totalFocusTime + session.duration,
      totalSessions: prev.totalSessions + 1,
      completedSessions: prev.completedSessions + (session.completed ? 1 : 0),
      pausedSessions: prev.pausedSessions + (session.paused ? 1 : 0)
    }));
    
    checkForAchievements();
  };

  // Check and award achievements
  const checkForAchievements = () => {
    const newAchievements = [];
    
    // Sample achievements logic
    if (analytics.completedSessions >= 5 && !analytics.achievements.includes('first_steps')) {
      newAchievements.push({
        id: 'first_steps',
        title: 'First Steps',
        description: 'Complete 5 focused sessions',
        icon: 'trophy',
        date: new Date().toISOString()
      });
    }
    
    if (analytics.completedSessions >= 20 && !analytics.achievements.includes('energon_master')) {
      newAchievements.push({
        id: 'energon_master',
        title: 'Energon Master',
        description: 'Complete 20 focused sessions',
        icon: 'star',
        date: new Date().toISOString()
      });
    }
    
    if (streak.current >= 3 && !analytics.achievements.includes('cybertron_streak')) {
      newAchievements.push({
        id: 'cybertron_streak',
        title: 'Cybertron Streak',
        description: 'Maintain a 3-day focus streak',
        icon: 'flame',
        date: new Date().toISOString()
      });
    }
    
    if (newAchievements.length > 0) {
      setAnalytics(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements.map(a => a.id)]
      }));
    }
    
    return newAchievements;
  };

  // Update streak data
  const updateStreak = (completed) => {
    if (!completed) return;
    
    const today = new Date().toDateString();
    
    setStreak(prev => {
      // If this is the first session ever
      if (!prev.lastDate) {
        return {
          current: 1,
          best: 1,
          lastDate: today
        };
      }
      
      // If already completed a session today
      if (prev.lastDate === today) {
        return prev;
      }
      
      // Check if the last session was yesterday
      const lastDate = new Date(prev.lastDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastDate.toDateString() === yesterday.toDateString()) {
        // Continued streak
        const newCurrent = prev.current + 1;
        return {
          current: newCurrent,
          best: Math.max(newCurrent, prev.best),
          lastDate: today
        };
      }
      
      // Streak broken, start new streak
      return {
        current: 1,
        best: Math.max(1, prev.best),
        lastDate: today
      };
    });
  };

  // Export all data
  const exportData = () => {
    const data = {
      sessions,
      analytics,
      streak,
      exportDate: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  };

  // Import data
  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.sessions && data.analytics && data.streak) {
        setSessions(data.sessions);
        setAnalytics(data.analytics);
        setStreak(data.streak);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  // Clear all data
  const clearData = () => {
    setSessions([]);
    setAnalytics({
      totalFocusTime: 0,
      totalSessions: 0,
      completedSessions: 0,
      pausedSessions: 0,
      achievements: []
    });
    setStreak({
      current: 0,
      best: 0,
      lastDate: null
    });
  };

  return (
    <DataContext.Provider value={{
      sessions,
      analytics,
      streak,
      addSession,
      exportData,
      importData,
      clearData
    }}>
      {children}
    </DataContext.Provider>
  );
};