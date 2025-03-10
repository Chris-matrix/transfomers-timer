// src/components/data/SessionHistory.jsx
import React from 'react';
import { useData } from '../../data/DataContext';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';

const SessionHistory = () => {
  const { sessions } = useData();

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time in human-readable format
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    
    return `${hours} hr ${remainingMinutes} min`;
  };

  // Group sessions by date
  const groupSessionsByDate = () => {
    const grouped = {};
    
    sessions.forEach(session => {
      const date = new Date(session.date).toDateString();
      
      if (!grouped[date]) {
        grouped[date] = [];
      }
      
      grouped[date].push(session);
    });
    
    return grouped;
  };

  const groupedSessions = groupSessionsByDate();
  const sortedDates = Object.keys(groupedSessions).sort((a, b) => new Date(b) - new Date(a));

  // If no sessions, show a message
  if (sessions.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-800 rounded-lg">
        <p className="text-gray-400">No sessions recorded yet. Complete a timer session to see your history.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Session History</h3>
      
      {sortedDates.map(date => (
        <div key={date} className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center mb-3 pb-2 border-b border-gray-700">
            <Calendar size={18} className="mr-2 text-blue-400" />
            <h4 className="font-medium">{formatDate(date)}</h4>
          </div>
          
          <div className="space-y-3">
            {groupedSessions[date].map(session => (
              <div key={session.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`mr-3 ${session.type === 'break' ? 'text-green-500' : 'text-blue-500'}`}>
                    {session.completed ? 
                      <CheckCircle size={18} /> : 
                      <XCircle size={18} className="text-gray-500" />
                    }
                  </div>
                  <div>
                    <div className="font-medium">
                      {session.type === 'break' ? 'Break' : 
                        session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(session.date).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-gray-400" />
                  <span>{formatDuration(session.duration)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionHistory;