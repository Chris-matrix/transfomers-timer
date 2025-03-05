import React from 'react';
import { useTheme } from '../settings/ThemeContext';

const ProgressIndicator = ({ percentage }) => {
  const { themeColors } = useTheme();
  
  return (
    <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden my-4">
      <div 
        className={`h-full ${themeColors.primary}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressIndicator;