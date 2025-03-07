// Import necessary React hooks and components
import React, { useState } from 'react';

// Import custom components
import TimerContainer from './features/timer/TimerContainer'; // Main timer logic and display
import { ThemeProvider } from './features/settings/ThemeContext'; // Provides theme (light/dark) context
import CharacterGif from './features/settings/CharacterGif'; // Displays a GIF based on the selected character
import CompletionMessage from './features/rewards/CompletionMessage'; // Message displayed when a timer session is completed
import CharacterSelector from './features/settings/CharacterSelector'; // Allows the user to select a character for customization
import ProgressIndicator from './features/progress/ProgressIndicator'; // Visual progress bar for the timer

// Import CSS for ProgressIndicator styling
import './features/progress/ProgressIndicator.css';

const App = () => {
  // State to track the currently selected character (for CharacterGif)
  const [selectedCharacter] = useState('');

  // State to control whether the completion message is shown
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  // State to store the number of minutes completed in a timer session (used in CompletionMessage)
  const [completionMessage, setCompletionMessage] = useState(0);

  // State to store achievements earned by the user (used in CompletionMessage)
  const [achievements, setAchievements] = useState([]);

  // State to track the progress percentage of the timer (used in ProgressIndicator)
  const [progress, setProgress] = useState(0);

  /**
   * Toggles the visibility of the completion message.
   * If it's currently visible, this function will hide it, and vice versa.
   */
  const toggleCompletionMessage = () => {
    setShowCompletionMessage(!showCompletionMessage);
  };

  /**
   * Adds a new achievement to the list of achievements.
   * @param {string} achievement - The name or description of the achievement to add.
   */
  const addAchievement = (achievement) => {
    setAchievements((prev) => [...prev, achievement]);
  };

  return (
    /**
     * The ThemeProvider wraps the entire app to provide consistent theming (e.g., light/dark mode).
     */
    <ThemeProvider>
      <div className="app-container">
        {/* Display an animated GIF based on the selected character */}
        <CharacterGif character={selectedCharacter} />

        {/* Main timer component: handles timer logic and allows interaction */}
        <TimerContainer 
          addAchievement={addAchievement} // Passes function to add achievements
          setCompletionMessage={setCompletionMessage} // Allows TimerContainer to update completion message
          setProgress={setProgress} // Allows TimerContainer to update progress percentage
        />

        {/* Progress bar that visually represents how much time has passed */}
        <ProgressIndicator progress={progress} />

        {/* Show a completion message when a timer session is finished */}
        {showCompletionMessage && (
          <CompletionMessage
            minutes={completionMessage} // Number of minutes completed in the session
            achievements={achievements} // List of achievements earned so far
            onClose={toggleCompletionMessage} // Function to close the completion message
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
