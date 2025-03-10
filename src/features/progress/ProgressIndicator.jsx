// src/features/progress/ProgressIndicator.jsx
import React, { useEffect, useState } from 'react';
import { useSettings } from '../settings/SettingsContext';
import './ProgressIndicator.css';

const ProgressIndicator = ({ percentage }) => {
  const { themeClasses, settings } = useSettings();
  const [animationClass, setAnimationClass] = useState('');
  
  // Ensure percentage is within valid range
  const validPercentage = Math.min(100, Math.max(0, percentage));
  
  // Set theme-specific animation class
  useEffect(() => {
    switch(settings.theme) {
      case 'optimus':
        setAnimationClass('optimus-pulse');
        break;
      case 'megatron':
        setAnimationClass('megatron-pulse');
        break;
      case 'bumblebee':
        setAnimationClass('bumblebee-pulse');
        break;
      default:
        setAnimationClass('optimus-pulse');
    }
  }, [settings.theme]);

  return (
    <div className="w-full h-4 bg-gray-700 bg-opacity-40 rounded-full overflow-hidden mb-6">
      <div 
        className={`h-full ${themeClasses.progressFill} transition-all duration-1000 ease-linear ${animationClass}`}
        style={{ width: `${validPercentage}%` }}
        aria-valuenow={validPercentage}
        aria-valuemin="0"
        aria-valuemax="100"
        role="progressbar"
      />
      <span className="sr-only">{validPercentage}% complete</span>
    </div>
  );
};

export default ProgressIndicator;