// src/components/data/DataManager.jsx
import React, { useState } from 'react';
import { useData } from '.../context/DataContext';
import { 
  X, 
  Download, 
  Upload, 
  Trash2, 
  FileText, 
  Clock, 
  Award, 
  Calendar, 
  AlertTriangle
} from 'lucide-react';

const DataManager = ({ onClose }) => {
  const { sessions, analytics, streak, exportData, importData, clearData } = useData();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importSuccess, setImportSuccess] = useState(false);

  // Handle export data to JSON file
  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `transformers_timer_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle import data from file
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const success = importData(e.target.result);
        if (success) {
          setImportSuccess(true);
          setImportError(null);
        } else {
          setImportError('Invalid data format. Import failed.');
        }
      } catch (error) {
        setImportError('Error importing data. Please check file format.');
      }
    };
    reader.readAsText(file);
  };

  // Format time in human-readable format (e.g., "3h 45m")
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Get storage usage
  const getStorageUsage = () => {
    const dataString = JSON.stringify({
      sessions,
      analytics,
      streak
    });
    
    return (new Blob([dataString]).size / 1024).toFixed(1);
  };

  return (
    <div className="max-w-md w-full mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg text-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Data Manager</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Clock className="mr-2 text-blue-400" size={20} />
              <h3 className="font-medium">Focus Time</h3>
            </div>
            <p className="text-2xl font-bold">{formatTime(analytics.totalFocusTime)}</p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <FileText className="mr-2 text-green-400" size={20} />
              <h3 className="font-medium">Sessions</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.totalSessions}</p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Award className="mr-2 text-yellow-400" size={20} />
              <h3 className="font-medium">Achievements</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.achievements.length}</p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Calendar className="mr-2 text-red-400" size={20} />
              <h3 className="font-medium">Best Streak</h3>
            </div>
            <p className="text-2xl font-bold">{streak.best} days</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Data Storage</h3>
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span>Storage Usage</span>
              <span className="font-medium">{getStorageUsage()} KB</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div 
                className="bg-blue-500 h-2.5 rounded-full" 
                style={{ width: '10%' }} 
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleExportData}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
          >
            <Download size={20} />
            Export Data
          </button>
          
          <label className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg cursor-pointer">
            <Upload size={20} />
            Import Data
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={handleImportData}
            />
          </label>
          
          {!showConfirmClear ? (
            <button 
              onClick={() => setShowConfirmClear(true)}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
            >
              <Trash2 size={20} />
              Clear All Data
            </button>
          ) : (
            <div className="bg-red-900 p-3 rounded-lg">
              <p className="mb-2 flex items-center gap-2">
                <AlertTriangle size={20} />
                Are you sure? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    clearData();
                    setShowConfirmClear(false);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded-md"
                >
                  Yes, Clear
                </button>
                <button 
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {importError && (
          <div className="mt-4 p-3 bg-red-900 text-white rounded-lg">
            <p className="flex items-center gap-2">
              <AlertTriangle size={20} />
              {importError}
            </p>
          </div>
        )}

        {importSuccess && (
          <div className="mt-4 p-3 bg-green-900 text-white rounded-lg">
            <p className="flex items-center gap-2">
              <Award size={20} />
              Data imported successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManager;