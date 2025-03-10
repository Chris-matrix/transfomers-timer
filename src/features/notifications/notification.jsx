import React from 'react';
import { useSettings } from './SettingsContext';
import { Bell, Volume2 } from 'lucide-react';

const NotificationSettings = () => {
  const { settings, updateSettings } = useSettings();

  const toggleNotifications = () => {
    updateSettings({
      notifications: !settings.notifications
    });
  };

  // Would need actual browser notification permission implementation here
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }

    if (Notification.permission === "granted") {
      updateSettings({ notifications: true });
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        updateSettings({ notifications: true });
      }
    }
  };

  // Preview notification sound
  const playNotificationSound = () => {
    const audio = new Audio('/alarm.mp3'); // Use the proper path based on your setup
    audio.volume = 0.5;
    audio.play().catch(err => console.error("Audio playback error:", err));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell size={20} className="text-indigo-500 mr-2" />
              <div>
                <h4 className="font-medium text-gray-800">Browser Notifications</h4>
                <p className="text-sm text-gray-500">Show notifications when timer finishes</p>
              </div>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input
                type="checkbox"
                id="notification-toggle"
                checked={settings.notifications}
                onChange={toggleNotifications}
                className="sr-only"
              />
              <label
                htmlFor="notification-toggle"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                  settings.notifications ? 'bg-indigo-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 rounded-full bg-white transform transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  } m-0.5`}
                ></span>
              </label>
            </div>
          </div>
          
          {settings.notifications && Notification.permission !== "granted" && (
            <div className="mt-3">
              <button
                onClick={requestNotificationPermission}
                className="text-sm px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                Allow Notifications
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Volume2 size={20} className="text-indigo-500 mr-2" />
              <div>
                <h4 className="font-medium text-gray-800">Sound Volume</h4>
                <p className="text-sm text-gray-500">Adjust notification sound volume</p>
              </div>
            </div>
            <button
              onClick={playNotificationSound}
              className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Test
            </button>
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value="50"
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            disabled
          />
          <p className="text-xs text-gray-500 mt-1 italic">Coming in future update</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;