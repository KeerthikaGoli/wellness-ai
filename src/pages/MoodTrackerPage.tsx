import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Calendar, BarChart2, Clock, Tag } from 'lucide-react';
import type { MoodEntry } from '../types';

const MOOD_TYPES = [
  { name: 'happy', emoji: '😊', color: 'bg-mood-happy' },
  { name: 'calm', emoji: '😌', color: 'bg-mood-calm' },
  { name: 'neutral', emoji: '😐', color: 'bg-mood-neutral' },
  { name: 'sad', emoji: '😢', color: 'bg-mood-sad' },
  { name: 'anxious', emoji: '😰', color: 'bg-mood-anxious' },
];

export default function MoodTrackerPage() {
  const [selectedView, setSelectedView] = useState<'calendar' | 'chart'>('calendar');
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    mood: '',
    note: '',
    tags: [] as string[],
  });

  const handleMoodSelect = (mood: string) => {
    setNewEntry(prev => ({ ...prev, mood }));
  };

  const handleAddEntry = () => {
    if (!newEntry.mood) return;

    const entry: MoodEntry = {
      timestamp: new Date(),
      mood: newEntry.mood as MoodEntry['mood'],
      note: newEntry.note,
      tags: newEntry.tags,
    };

    setMoodEntries(prev => [...prev, entry]);
    setNewEntry({ mood: '', note: '', tags: [] });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mood Tracker</h1>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedView('calendar')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                selectedView === 'calendar'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar View</span>
            </button>
            <button
              onClick={() => setSelectedView('chart')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                selectedView === 'chart'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span>Chart View</span>
            </button>
          </div>
        </div>

        {/* New Entry Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How are you feeling?</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {MOOD_TYPES.map((mood) => (
                <button
                  key={mood.name}
                  onClick={() => handleMoodSelect(mood.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    newEntry.mood === mood.name
                      ? `${mood.color} text-gray-900`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="capitalize">{mood.name}</span>
                </button>
              ))}
            </div>
            <textarea
              value={newEntry.note}
              onChange={(e) => setNewEntry(prev => ({ ...prev, note: e.target.value }))}
              placeholder="Add a note about how you're feeling..."
              className="input-field h-24 resize-none dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddEntry}
                disabled={!newEntry.mood}
                className="btn-primary"
              >
                Log Mood
              </button>
            </div>
          </div>
        </div>

        {/* Mood History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mood History</h2>
            <div className="flex space-x-2">
              {['daily', 'weekly', 'monthly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period as typeof selectedPeriod)}
                  className={`px-3 py-1 rounded-lg ${
                    selectedPeriod === period
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Placeholder for mood visualization */}
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              {selectedView === 'calendar' ? 'Calendar View' : 'Chart View'} Coming Soon
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}