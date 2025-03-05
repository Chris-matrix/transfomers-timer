import React from 'react';
import { useTheme } from '../settings/ThemeContext';

const Footer = () => {
  const { themeColors } = useTheme();
  
  return (
    <footer className={`p-4 ${themeColors.primary} text-center`}>
      <p className="text-sm">
        "Till all are timed!" | &copy; {new Date().getFullYear()} Cybertron Tech
      </p>
    </footer>
  );
};

export default Footer;