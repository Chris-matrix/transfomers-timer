// src/components/analytics/SessionStats.jsx
import React from 'react';
import { useTimer } from '../../features/TimerContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Legend 
} from 'recharts';
import { Clock, Calendar, Award, TrendingUp } from 'lucide-react';

export default function SessionStats() {
  const { sessionHistory, sessionsCompleted, sessionsGoal } = useTimer();
  
  if (sessionHistory.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <Alert>
            <AlertDescription>
              No sessions completed yet. Start your first focus session to see your stats.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  // Group sessions by day
  const sessionsByDay = sessionHistory.reduce((acc, session) => {
    const date = new Date(session.completed).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {});
  
  // Prepare data for daily session count chart
  const dailyData = Object.keys(sessionsByDay).map(date => ({
    date,
    sessions: sessionsByDay[date].length,
    focusTime: Math.round(sessionsByDay[date].reduce((sum, s) => sum + s.duration, 0) / 60)
  }));
  
  // Calculate total focus time
  const totalFocusTime = sessionHistory.reduce((sum, s) => sum + s.duration, 0);
  const focusHours = Math.floor(totalFocusTime / 3600);
  const focusMinutes = Math.floor((totalFocusTime % 3600) / 60);
  
  // Calculate average session length
  const avgSessionLength = Math.round(totalFocusTime / sessionHistory.length / 60);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Focus Time</p>
                <h3 className="text-2xl font-bold">
                  {focusHours}h {focusMinutes}m
                </h3>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Sessions Completed</p>
                <h3 className="text-2xl font-bold">
                  {sessionsCompleted} / {sessionsGoal}
                </h3>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Avg. Session Length</p>
                <h3 className="text-2xl font-bold">
                  {avgSessionLength} min
                </h3>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Daily Focus Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" name="Sessions" fill="#8884d8" />
                <Bar dataKey="focusTime" name="Focus Minutes" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}