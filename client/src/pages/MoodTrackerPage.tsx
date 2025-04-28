import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Plus, Smile, Frown, Meh, History } from 'lucide-react';
import MoodQuestionnaire from '../components/MoodQuestionnaire';

interface MoodEntry {
  id: string;
  date: Date;
  totalScore: number;
  answers: Record<string, number>;
  analysis: {
    mood: string;
    insights: string[];
    recommendations: string[];
  };
}

export default function MoodTrackerPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadMoodHistory();
  }, [user, navigate]);

  const loadMoodHistory = async () => {
    try {
      // TODO: Implement API call to fetch mood history
      // For now, using sample data
      setEntries([
        {
          id: '1',
          date: new Date('2024-03-15'),
          totalScore: 38,
          answers: {
            q1: 4, q2: 4, q3: 4, q4: 4, q5: 4, q6: 4, q7: 2, q8: 4, q9: 4, q10: 4
          },
          analysis: {
            mood: 'positive',
            insights: [
              "You're maintaining a good level of energy and motivation",
              "Your stress levels are well managed",
              "You're experiencing good social connections"
            ],
            recommendations: [
              "Continue your current routine as it's working well",
              "Consider adding a short meditation session to maintain stress levels",
              "Keep engaging in social activities"
            ]
          }
        },
        {
          id: '2',
          date: new Date('2024-03-14'),
          totalScore: 28,
          answers: {
            q1: 3, q2: 3, q3: 3, q4: 3, q5: 3, q6: 3, q7: 4, q8: 3, q9: 3, q10: 3
          },
          analysis: {
            mood: 'neutral',
            insights: [
              "You're experiencing moderate stress levels",
              "Your energy and motivation are at average levels",
              "Social connections could be improved"
            ],
            recommendations: [
              "Try to get more rest and sleep",
              "Consider talking to friends or family about your stress",
              "Engage in activities you enjoy to boost mood"
            ]
          }
        }
      ]);
    } catch (error) {
      console.error('Error loading mood history:', error);
    }
  };

  const handleQuestionnaireSubmit = async (totalScore: number, answers: Record<string, number>) => {
    try {
      // TODO: Implement API call to save mood entry
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        date: new Date(),
        totalScore,
        answers,
        analysis: generateAnalysis(totalScore, answers)
      };
      setEntries(prev => [newEntry, ...prev]);
      setShowQuestionnaire(false);
      setShowHistory(true);
    } catch (error) {
      console.error('Error saving mood entry:', error);
    }
  };

  const generateAnalysis = (totalScore: number, answers: Record<string, number>) => {
    const mood = totalScore >= 40 ? 'positive' : totalScore >= 30 ? 'neutral' : 'negative';
    
    const insights = [
      totalScore >= 40 ? "You're feeling very positive and energetic" :
      totalScore >= 30 ? "You're maintaining a balanced state" :
      "You might be experiencing some challenges"
    ];

    const recommendations = [
      totalScore >= 40 ? "Keep up your current routine" :
      totalScore >= 30 ? "Consider adding some self-care activities" :
      "Try to identify and address sources of stress"
    ];

    return { mood, insights, recommendations };
  };

  const getMoodIcon = (mood: string) => {
    if (mood === 'positive') return <Smile className="w-6 h-6 text-green-500" />;
    if (mood === 'neutral') return <Meh className="w-6 h-6 text-yellow-500" />;
    return <Frown className="w-6 h-6 text-red-500" />;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mood Tracker</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setShowQuestionnaire(true);
                setShowHistory(false);
              }}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5" />
              <span>New Entry</span>
            </button>
            <button
              onClick={() => {
                setShowQuestionnaire(false);
                setShowHistory(true);
              }}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <History className="w-5 h-5" />
              <span>Past Analysis</span>
            </button>
          </div>
        </div>

        {showQuestionnaire && (
          <MoodQuestionnaire onSubmit={handleQuestionnaireSubmit} />
        )}

        {showHistory && (
          <div className="space-y-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    {getMoodIcon(entry.analysis.mood)}
                    <span className="text-lg font-semibold">
                      Score: {entry.totalScore}/50
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {entry.date.toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Insights</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2">
                      {entry.analysis.insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Recommendations</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2">
                      {entry.analysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}