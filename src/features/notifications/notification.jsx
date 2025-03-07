import React from 'react';
import { useTheme } from '../settings/ThemeContext';

const Notification = ({ message, onDismiss, title = "Mission Complete!" }) => {
  const { themeColors } = useTheme();

  return (
    <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-md p-4 rounded-lg flex flex-col items-center justify-center z-50 notification-animation">
      <div className={`${themeColors.primary} border-4 ${themeColors.accent} p-4 rounded-lg shadow-lg w-full`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <button 
            onClick={onDismiss}
            className={`${themeColors.button} hover:${themeColors.buttonHover} rounded-full w-8 h-8 flex items-center justify-center`}
          >
            &times;
          </button>
        </div>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button 
            onClick={onDismiss}
            className={`${themeColors.button} hover:${themeColors.buttonHover} py-2 px-4 rounded`}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;