export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  analysis?: MessageAnalysis;
}

export interface MessageAnalysis {
  mentalHealth: string | null;
  mood: string | null;
}

export interface WeeklyData {
  chatCount: number;
  moodCounts: [string, number][]; // [mood, count]
  mentalHealthCounts: [string, number][]; // [condition, count]
  startDate: string;
  hasFullWeekData: boolean;
}