import React from 'react';
import { Settings, BarChart2 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const Header = ({ onSettingsClick, onDataClick }) => {
  const { themeClasses } = useSettings();
  
  return (
    <header className={`${themeClasses.primary} py-4 px-6 flex justify-between items-center shadow-md`}>
      <div className="flex items-center">
        <div className="w-8 h-8 mr-3 transform-animation">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
            <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold font-['Orbitron'] tracking-wider">TRANSFORMERS TIMER</h1>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={onDataClick}
          className="p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition"
          aria-label="View data and analytics"
        >
          <BarChart2 size={24} />
        </button>
        <button 
          onClick={onSettingsClick}
          className="p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition"
          aria-label="Open settings"
        >
          <Settings size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;