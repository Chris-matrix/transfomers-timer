import React from 'react';
import TimerContainer from './features/timer/TimerContainer';
import { ThemeProvider } from './features/settings/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <TimerContainer />
    </ThemeProvider>
  );
};

export default App;
