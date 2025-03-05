import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { getStreak } from './StreakService';

const StreakCounter = () => {
  const [streak, setStreak] = useState(0);
  
  useEffect(() => {
    const { streak } = getStreak();
    setStreak(streak);
    
    // Event listener for storage changes
    const handleStorageChange = () => {
      const { streak } = getStreak();
      setStreak(streak);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="flex items-center">
      <Flame size={24} className="mr-2 text-orange-500" />
      <span className="text-xl font-bold">
        Streak: {streak} {streak !== 1 ? 'days' : 'day'}
      </span>
    </div>
  );
};

export default StreakCounter;