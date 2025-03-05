import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTheme } from '../settings/ThemeContext';

const CompletionMessage = ({ minutes }) => {
  const { themeColors } = useTheme();
  
  // Generate reward message based on completed time
  const getRewardMessage = () => {
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

  return (
    <div className={`w-full max-w-md p-6 rounded-lg ${themeColors.primary} mb-8 text-center`}>
      <CheckCircle size={48} className="mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Mission Complete!</h2>
      <p className="text-lg mb-4">{getRewardMessage()}</p>
    </div>
  );
};

export default CompletionMessage;
