import React, { useState } from 'react';
import TimerContainer from './features/timer/TimerContainer';
import { ThemeProvider } from './features/settings/ThemeContext';
import CharacterGif from './features/settings/CharacterGif';
import CompletionMessage from './features/rewards/CompletionMessage';
import CharacterSelector from './features/settings/CharacterSelector';
import ProgressIndicator from './features/progress/ProgressIndicator';
import './features/progress/ProgressIndicator.css';

const App = () => {
  // State to manage the selected character
  const [selectedCharacter, setSelectedCharacter] = useState('');
  
  // State to manage the visibility of the completion message
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  
  // State to manage the completion message content
  const [completionMessage, setCompletionMessage] = useState(0);
  
  // State to manage the list of achievements
  const [achievements, setAchievements] = useState([]);
  
  // State to manage the progress percentage
  const [progress, setProgress] = useState(0);

  // Toggle the visibility of the completion message
  const toggleCompletionMessage = () => {
    setShowCompletionMessage(!showCompletionMessage);
  };

  // Add a new achievement to the list
  const addAchievement = (achievement) => {
    setAchievements((prev) => [...prev, achievement]);
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        {/* Display the selected character's GIF */}
        <CharacterGif character={selectedCharacter} />
        
        {/* Timer container component */}
        <TimerContainer 
          addAchievement={addAchievement}
          setCompletionMessage={setCompletionMessage}
          setProgress={setProgress}
        />
        
        {/* Progress indicator component */}
        <ProgressIndicator progress={progress} />
        
        {/* Display the completion message if the timer is complete */}
        {showCompletionMessage && (
          <CompletionMessage
            minutes={completionMessage}
            achievements={achievements}
            onClose={toggleCompletionMessage}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
