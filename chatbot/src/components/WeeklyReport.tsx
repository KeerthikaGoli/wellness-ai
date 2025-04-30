import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import { getColorForMood, getColorForMentalHealth } from '../utils/colorUtils';

const WeeklyReport: React.FC = () => {
  const { closeReportModal, weeklyData } = useChatContext();
  
  // Sample data for demonstration
  const sampleData = {
    chatCount: 42,
    startDate: '2024-03-10T10:00:00Z',
    hasFullWeekData: true,
    moodCounts: [
      ['Happy', 12],
      ['Anxious', 8],
      ['Sad', 6],
      ['Relaxed', 5],
      ['Confused', 4]
    ],
    mentalHealthCounts: [
      ['Anxiety', 10],
      ['Stress', 8],
      ['Depression', 5],
      ['Loneliness', 3]
    ]
  };
  
  // Use sample data if no real data is available
  const data = weeklyData.chatCount === 0 ? sampleData : weeklyData;
  
  // Calculate percentages
  const totalMentalHealthEntries = data.mentalHealthCounts.reduce(
    (acc, [_, count]) => acc + count, 0
  );
  
  const totalMoodEntries = data.moodCounts.reduce(
    (acc, [_, count]) => acc + count, 0
  );
  
  const startDate = new Date(data.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Mental Health Report</h2>
            <p className="text-sm text-gray-500">
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </p>
          </div>
          <button 
            onClick={closeReportModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {!data.hasFullWeekData ? (
            <div className="text-center py-8 space-y-4">
              <AlertCircle className="h-12 w-12 text-blue-500 mx-auto" />
              <div>
                <p className="text-gray-800 font-medium">Not enough data yet</p>
                <p className="text-gray-500">Continue chatting for 7 days to see your full mental health analysis.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Sample report shown below for demonstration purposes.
                </p>
              </div>
            </div>
          ) : null}
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-800">Weekly Overview</h3>
            <p className="text-gray-600">
              Based on your {data.chatCount} messages this week:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <StatCard 
                title="Total Messages" 
                value={data.chatCount} 
                color="bg-blue-500"
              />
              <StatCard 
                title="Dominant Mood" 
                value={data.moodCounts[0]?.[0] || 'N/A'} 
                color={`bg-${getColorForMood(data.moodCounts[0]?.[0] || '')}`}
              />
              <StatCard 
                title="Primary Concern" 
                value={data.mentalHealthCounts[0]?.[0] || 'N/A'} 
                color={`bg-${getColorForMentalHealth(data.mentalHealthCounts[0]?.[0] || '')}`}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Mood Distribution</h3>
              <div className="space-y-3">
                {data.moodCounts.map(([mood, count]) => (
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
              <div className="space-y-3">
                {data.mentalHealthCounts.map(([condition, count]) => (
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
            <h3 className="text-lg font-medium text-gray-800">Weekly Insights</h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <InsightCard 
                title="Mood Patterns"
                content={generateMoodInsight(data.moodCounts)}
              />
              <InsightCard 
                title="Mental Health Trends"
                content={generateMentalHealthInsight(data.mentalHealthCounts)}
              />
              <InsightCard 
                title="Recommendations"
                content={generateRecommendations(data)}
              />
            </div>
          </div>
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

interface InsightCardProps {
  title: string;
  content: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, content }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
};

const generateMoodInsight = (moodCounts: [string, number][]): string => {
  if (moodCounts.length === 0) return "Not enough mood data collected yet.";
  
  const dominantMood = moodCounts[0][0];
  const secondMood = moodCounts[1]?.[0];
  
  return `Your predominant mood this week was ${dominantMood.toLowerCase()}${
    secondMood ? `, followed by periods of feeling ${secondMood.toLowerCase()}` : ''
  }. This pattern suggests ${getMoodImplication(dominantMood)}.`;
};

const getMoodImplication = (mood: string): string => {
  switch (mood.toLowerCase()) {
    case 'happy':
      return 'you are maintaining a positive outlook';
    case 'anxious':
      return 'you might be facing some challenging situations';
    case 'sad':
      return 'you might be processing some difficult emotions';
    case 'relaxed':
      return 'you are managing stress effectively';
    case 'confused':
      return 'you might be dealing with some uncertainty';
    default:
      return 'you are experiencing various emotional states';
  }
};

const generateMentalHealthInsight = (mentalHealthCounts: [string, number][]): string => {
  if (mentalHealthCounts.length === 0) return "Not enough data to analyze mental health patterns.";
  
  const primaryConcern = mentalHealthCounts[0][0];
  return `The most prominent theme in our conversations has been ${primaryConcern.toLowerCase()}. ${
    getMentalHealthSuggestion(primaryConcern)
  }`;
};

const getMentalHealthSuggestion = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'anxiety':
      return 'Consider incorporating relaxation techniques into your daily routine.';
    case 'depression':
      return 'Regular physical activity and social connections can help improve your mood.';
    case 'stress':
      return 'Taking regular breaks and practicing time management may help reduce stress levels.';
    case 'loneliness':
      return 'Try reaching out to friends or joining community activities to build connections.';
    default:
      return 'Focus on self-care and maintaining healthy daily routines.';
  }
};

const generateRecommendations = (data: WeeklyData): string => {
  const dominantMood = data.moodCounts[0]?.[0];
  const primaryConcern = data.mentalHealthCounts[0]?.[0];
  
  let recommendations = 'Based on your conversation patterns, consider: ';
  
  if (dominantMood) {
    recommendations += getMoodRecommendation(dominantMood) + ' ';
  }
  
  if (primaryConcern) {
    recommendations += getMentalHealthRecommendation(primaryConcern) + ' ';
  }
  
  return recommendations + 'Remember that small, consistent steps often lead to meaningful improvements in mental well-being.';
};

const getMoodRecommendation = (mood: string): string => {
  switch (mood.toLowerCase()) {
    case 'anxious':
      return 'practicing daily mindfulness or breathing exercises;';
    case 'sad':
      return 'engaging in activities that bring you joy, even if briefly;';
    case 'angry':
      return 'trying physical exercise as an outlet for intense emotions;';
    case 'confused':
      return 'breaking down complex situations into smaller, manageable parts;';
    case 'happy':
      return 'maintaining your positive routines and sharing your energy with others;';
    default:
      return 'establishing a consistent self-care routine;';
  }
};

const getMentalHealthRecommendation = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'anxiety':
      return 'exploring anxiety management techniques like the 5-4-3-2-1 grounding exercise.';
    case 'depression':
      return 'setting small, achievable daily goals and celebrating your progress.';
    case 'stress':
      return 'implementing regular breaks and stress-relief activities in your schedule.';
    case 'loneliness':
      return 'joining community groups or online forums aligned with your interests.';
    default:
      return 'maintaining open communication about your feelings with trusted people.';
  }
};

export default WeeklyReport;