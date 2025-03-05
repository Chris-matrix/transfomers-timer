export const getSettings = () => {
    return {
      theme: localStorage.getItem('theme') || 'autobots',
      notificationSound: localStorage.getItem('notificationSound') || 'optimusPrime',
      notificationEnabled: localStorage.getItem('notificationEnabled') === 'true' || true,
    };
  };
  
  export const saveSettings = (settings) => {
    localStorage.setItem('theme', settings.theme);
    localStorage.setItem('notificationSound', settings.notificationSound);
    localStorage.setItem('notificationEnabled', settings.notificationEnabled.toString());
  };