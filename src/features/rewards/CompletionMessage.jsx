// src/components/rewards/CompletionMessage.jsx
import React from 'react';
import { X, Award, Clock } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { useData } from '../../contexts/DataContext';

const CompletionMessage = ({ data, onClose }) => {
  const { themeClasses } = useSettings();
  const { analytics, streak } = useData();
  
  // Generate reward message based on completed time
  const getRewardMessage = () => {
    const minutes = Math.floor(data.duration / 60);
    
    if (minutes < 5) {
      return "Quick mission complete! Energon levels stable.";
    } else if (minutes < 15) {
      return "Well done, soldier! Cybertron is proud of your focus.";
    } else if (minutes < 30) {
      return "Impressive focus! The AllSpark grows stronger with your dedication.";
    } else {
      return "By the Matrix! Your concentration rivals that of a Prime. The Autobots salute you!";
    }
  };
  
  // Get a quote based on the current theme
  const getThemeQuote = () => {
    const quotes = {
      optimus: "Freedom is the right of all sentient beings.",
      megatron: "Peace through tyranny!",
      bumblebee: "*happy beeping sounds*"
    };
    
    return quotes[themeClasses.theme] || quotes.optimus;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md p-6 rounded-lg ${themeClasses.primary} ${themeClasses.text} shadow-2xl`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Mission Complete!</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black hover:bg-opacity-20"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-lg mb-4">{getRewardMessage()}</p>
          <p className="italic text-sm">{getThemeQuote()}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black bg-opacity-20 p-3 rounded-lg flex items-center">
            <Clock className="mr-2" size={20} />
            <div>
              <p className="text-sm opacity-80">Focus Time</p>
              <p className="font-bold">{Math.floor(data.duration / 60)} minutes</p>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-20 p-3 rounded-lg flex items-center">
            <Award className="mr-2" size={20} />
            <div>
              <p className="text-sm opacity-80">Current Streak</p>
              <p className="font-bold">{streak.current} day{streak.current !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="mb-3 text-sm opacity-80">Total Focus Sessions: {analytics.completedSessions}</p>
          <button 
            onClick={onClose}
            className={`${themeClasses.button} py-2 px-6 rounded-md font-medium`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionMessage;