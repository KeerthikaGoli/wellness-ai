import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, Edit2, Trash2 } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  date: Date;
  insights: string[];
  gratitude: string[];
  challenges: string[];
}

export default function JournalPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    title: '',
    content: '',
    mood: 'neutral',
    tags: [],
    insights: [],
    gratitude: [],
    challenges: []
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadJournalEntries();
  }, [user, navigate]);

  const loadJournalEntries = async () => {
    try {
      // TODO: Implement API call to fetch journal entries
      // For now, using sample data
      setEntries([
        {
          id: '1',
          title: 'Project Completion',
          content: 'Today I finally completed the major project I was working on. It was challenging but rewarding. I learned a lot about time management and stress handling. The meditation sessions really helped me stay focused.',
          mood: 'happy',
          tags: ['achievement', 'reflection', 'goal'],
          date: new Date('2024-03-15'),
          insights: ['Regular breaks improve productivity', 'Meditation helps with focus'],
          gratitude: ['Supportive team', 'Good health', 'Learning opportunities'],
          challenges: ['Managing time effectively', 'Staying focused under pressure']
        },
        {
          id: '2',
          title: 'Self-Care Day',
          content: 'Took a day off to focus on self-care. Started with morning meditation, followed by a good workout. Spent time with friends in the evening. Realized how important it is to take breaks and recharge.',
          mood: 'calm',
          tags: ['self_care', 'reflection'],
          date: new Date('2024-03-14'),
          insights: ['Regular self-care is essential', 'Social connections are important'],
          gratitude: ['Supportive friends', 'Good weather', 'Free time'],
          challenges: ['Balancing work and personal life']
        }
      ]);
    } catch (error) {
      console.error('Error loading journal entries:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to save new entry
      const entry: JournalEntry = {
        ...newEntry as JournalEntry,
        id: Date.now().toString(),
        date: new Date()
      };
      setEntries(prev => [entry, ...prev]);
      setShowForm(false);
      setNewEntry({
        title: '',
        content: '',
        mood: 'neutral',
        tags: [],
        insights: [],
        gratitude: [],
        challenges: []
      });
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // TODO: Implement API call to delete entry
      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Journal</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" />
            <span>New Entry</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">New Journal Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content
                </label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  rows={6}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {entry.date.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {entry.content}
              </p>
              <div className="mt-4 space-y-2">
                {entry.insights.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Insights</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                      {entry.insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {entry.gratitude.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Gratitude</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                      {entry.gratitude.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {entry.challenges.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Challenges</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                      {entry.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}