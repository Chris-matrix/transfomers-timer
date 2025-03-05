import React from 'react';
import { Settings } from 'lucide-react';
import { useTheme } from '../settings/ThemeContext';

const Header = ({ onSettingsClick }) => {
  const { themeColors } = useTheme();
  
  return (
    <header className={`p-4 ${themeColors.primary} flex justify-between items-center`}>
      <h1 className={`text-2xl font-bold ${themeColors.text}`}>TRANSFORMERS TIMER</h1>
      <button 
        onClick={onSettingsClick}
        className="p-2 rounded-full hover:bg-gray-700"
      >
        <Settings size={24} />
      </button>
    </header>
  );
};

export default Header;