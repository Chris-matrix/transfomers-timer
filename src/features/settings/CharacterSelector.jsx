// 1. First, let's enhance the CharacterSelector with better debugging
// src/features/settings/CharacterSelector.jsx

import React from 'react';
import { useTheme } from '../settings/ThemeContext';

const CharacterSelector = () => {
  const { changeCharacter, currentCharacter, themeColors } = useTheme();

  const characters = [
    { id: 'optimusPrime', name: 'Optimus Prime' },
    { id: 'bumblebee', name: 'Bumblebee' },
    { id: 'megatron', name: 'Megatron' }
  ];

  const handleCharacterChange = (characterId) => {
    console.log('Character selection clicked:', characterId);
    console.log('Current character before change:', currentCharacter);
    console.log('Current theme before change:', themeColors);
    
    // Force a distinct state change with setTimeout to ensure it's handled as a separate event
    setTimeout(() => {
      changeCharacter(characterId);
      console.log('changeCharacter function called with:', characterId);
    }, 0);
  };

  return (
    <div className="my-4">
      <h3 className="text-lg font-medium mb-2">Select Character: {currentCharacter}</h3>
      <div className="flex space-x-2">
        {characters.map(character => (
          <button
            key={character.id}
            onClick={() => handleCharacterChange(character.id)}
            className={`px-4 py-2 rounded cursor-pointer ${
              currentCharacter === character.id 
                ? 'ring-2 ring-offset-2 ring-blue-500 font-bold' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            data-character-id={character.id}
          >
            {character.name}
          </button>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Active theme: {currentCharacter} - Primary: {themeColors.primary}
      </div>
    </div>
  );
};

export default CharacterSelector;