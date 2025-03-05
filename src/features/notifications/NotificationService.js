import { getSettings } from '../settings/SettingsService';

export const playNotificationSound = () => {
  const { notificationEnabled, notificationSound } = getSettings();
  
  if (notificationEnabled) {
    // Play notification sound based on settings
    const audio = new Audio();
    
    switch(notificationSound) {
      case 'optimusPrime':
        audio.src = '/api/placeholder/1/1'; // Placeholder for audio
        break;
      case 'bumblebee':
        audio.src = '/api/placeholder/1/1'; // Placeholder for audio
        break;
      case 'megatron':
        audio.src = '/api/placeholder/1/1'; // Placeholder for audio
        break;
      default:
        audio.src = '/api/placeholder/1/1'; // Placeholder for audio
    }
    
    audio.play().catch(error => console.error("Audio playback error:", error));
  }
};