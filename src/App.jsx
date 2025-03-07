import React, { useState } from 'react';
import TimerContainer from './features/timer/TimerContainer';
import { ThemeProvider } from './features/settings/ThemeContext';
import CharacterGif from './features/settings/CharacterGif';
import CompletionMessage from './features/rewards/CompletionMessage';
import CharacterSelector from './features/settings/CharacterSelector';
import ProgressIndicator from './features/progress/ProgressIndicator';
import './features/progress/ProgressIndicator.css';

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [completionMessage, setCompletionMessage] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [progress, setProgress] = useState(0);

  const toggleCompletionMessage = () => {
    setShowCompletionMessage(!showCompletionMessage);
  };

  const addAchievement = (achievement) => {
    setAchievements((prev) => [...prev, achievement]);
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        <CharacterGif character={selectedCharacter} />
        <TimerContainer 
          addAchievement={addAchievement}
          setCompletionMessage={setCompletionMessage}
          setProgress={setProgress}
        />
        <ProgressIndicator progress={progress} />
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
