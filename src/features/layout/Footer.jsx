import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const Footer = () => {
  const { themeClasses } = useSettings();
  
  return (
    <footer className={`${themeClasses.primary} py-3 px-6 text-center text-opacity-90 text-sm`}>
      <p className="font-['Orbitron'] tracking-wider">
        "Till all are timed!" | &copy; {new Date().getFullYear()} Cybertron Tech
      </p>
    </footer>
  );
};

export default Footer;