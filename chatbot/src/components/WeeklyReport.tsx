import React from 'react';
import { X } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import { getColorForMood, getColorForMentalHealth } from '../utils/colorUtils';

const WeeklyReport: React.FC = () => {
  const { closeReportModal, weeklyData } = useChatContext();
  
  // Calculate percentages for mental health conditions
  const totalMentalHealthEntries = weeklyData.mentalHealthCounts.reduce(
    (acc, [_, count]) => acc + count, 0
  );
  
  // Calculate percentages for moods
  const totalMoodEntries = weeklyData.moodCounts.reduce(
    (acc, [_, count]) => acc + count, 0
  );
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-800">Your 7-Day Mental Health Report</h2>
          <button 
            onClick={closeReportModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {weeklyData.chatCount === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Not enough data yet. Chat more to generate your report!</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-800">Summary</h3>
                <p className="text-gray-600">
                  Based on your {weeklyData.chatCount} messages over the past 7 days:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <StatCard 
                    title="Total Messages" 
                    value={weeklyData.chatCount} 
                    color="bg-blue-500"
                  />
                  <StatCard 
                    title="Dominant Mood" 
                    value={weeklyData.moodCounts.length > 0 ? weeklyData.moodCounts[0][0] : 'N/A'} 
                    color={`bg-${getColorForMood(weeklyData.moodCounts.length > 0 ? weeklyData.moodCounts[0][0] : '')}`}
                  />
                  <StatCard 
                    title="Mental Health Focus" 
                    value={weeklyData.mentalHealthCounts.length > 0 ? weeklyData.mentalHealthCounts[0][0] : 'N/A'} 
                    color={`bg-${getColorForMentalHealth(weeklyData.mentalHealthCounts.length > 0 ? weeklyData.mentalHealthCounts[0][0] : '')}`}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Your Moods</h3>
                  <div className="space-y-2">
                    {weeklyData.moodCounts.map(([mood, count]) => (
                      <div key={mood} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{mood}</span>
                          <span className="text-sm text-gray-500">
                            {Math.round((count / totalMoodEntries) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${getColorForMood(mood)}`}
                            style={{ width: `${(count / totalMoodEntries) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Mental Health Indicators</h3>
                  <div className="space-y-2">
                    {weeklyData.mentalHealthCounts.map(([condition, count]) => (
                      <div key={condition} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{condition}</span>
                          <span className="text-sm text-gray-500">
                            {Math.round((count / totalMentalHealthEntries) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${getColorForMentalHealth(condition)}`}
                            style={{ width: `${(count / totalMentalHealthEntries) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Recommendations</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    {generateRecommendation(weeklyData)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className={`w-12 h-1 ${color} rounded-full mb-3`}></div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
};

// Helper function to generate recommendations based on the weekly data
const generateRecommendation = (weeklyData: any) => {
  const dominantMood = weeklyData.moodCounts.length > 0 ? weeklyData.moodCounts[0][0] : null;
  const dominantCondition = weeklyData.mentalHealthCounts.length > 0 ? weeklyData.mentalHealthCounts[0][0] : null;
  
  if (!dominantMood && !dominantCondition) {
    return "Continue chatting to receive personalized recommendations based on your mood patterns.";
  }
  
  let recommendation = "Based on your conversations this week, here are some suggestions: ";
  
  if (dominantMood) {
    switch (dominantMood.toLowerCase()) {
      case 'anxious':
        recommendation += "Try deep breathing exercises daily (4-7-8 technique) and consider limiting caffeine. ";
        break;
      case 'sad':
        recommendation += "Schedule time for activities you enjoy, even briefly. Morning sunlight exposure can help. ";
        break;
      case 'angry':
        recommendation += "When anger arises, try counting to 10 before responding. Physical activity can be a great outlet. ";
        break;
      case 'stressed':
      case 'overwhelmed':
        recommendation += "Break large tasks into smaller, manageable steps. Consider a 10-minute daily meditation. ";
        break;
      case 'happy':
      case 'excited':
        recommendation += "Wonderful! Note what's working well in your journal to reference during more difficult times. ";
        break;
      default:
        recommendation += "Focus on regular sleep, nutrition, exercise, and social connection - all proven foundations for mental wellbeing. ";
    }
  }
  
  if (dominantCondition) {
    switch (dominantCondition.toLowerCase()) {
      case 'anxiety':
        recommendation += "Consider mindfulness meditation apps or the DARE technique when anxiety peaks. ";
        break;
      case 'depression':
        recommendation += "Even small achievements deserve celebration. Set one tiny goal each morning. ";
        break;
      case 'stress':
      case 'burnout':
        recommendation += "Review your boundaries and practice saying 'no' to preserve your energy for priorities. ";
        break;
      case 'loneliness':
        recommendation += "Reach out to one person this week, even briefly. Consider volunteering or group activities aligned with your interests. ";
        break;
    }
  }
  
  return recommendation + "Remember that small, consistent steps often lead to the most meaningful changes in how we feel.";
};

export default WeeklyReport;