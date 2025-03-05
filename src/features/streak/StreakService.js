export const getStreak = () => {
    return {
      streak: localStorage.getItem('streak') ? parseInt(localStorage.getItem('streak')) : 0,
      lastCompletedDate: localStorage.getItem('lastCompletedDate') || '',
    };
  };
  
  export const updateStreak = () => {
    const { streak, lastCompletedDate } = getStreak();
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    let newStreak = streak;
    
    // If last completed was yesterday, increment streak
    if (lastCompletedDate === yesterdayString) {
      newStreak += 1;
    } 
    // If last completed was not yesterday and not today, reset streak
    else if (lastCompletedDate !== today) {
      newStreak = 1;
    }
    
    localStorage.setItem('streak', newStreak.toString());
    localStorage.setItem('lastCompletedDate', today);
    
    return newStreak;
  };