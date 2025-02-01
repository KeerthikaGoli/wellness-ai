export interface User {
  id: string;
  name?: string;
  isAnonymous: boolean;
}

export interface MoodEntry {
  timestamp: Date;
  mood: 'happy' | 'calm' | 'neutral' | 'sad' | 'anxious';
  note?: string;
  tags?: string[];
}

export interface JournalEntry {
  id: string;
  timestamp: Date;
  content: string;
  mood?: string;
  isAIGenerated: boolean;
}