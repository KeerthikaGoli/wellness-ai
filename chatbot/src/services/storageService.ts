import { Message, WeeklyData } from '../types';

const MESSAGES_STORAGE_KEY = 'mindfulchat_messages';
const MAX_DAYS_TO_STORE = 7;

export const saveMessageToStorage = (message: Message): void => {
  const savedMessages = getSavedMessages();
  savedMessages.push(message);
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - MAX_DAYS_TO_STORE);
  
  const filteredMessages = savedMessages.filter(msg => {
    const msgDate = new Date(msg.timestamp);
    return msgDate >= oneWeekAgo;
  });
  
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(filteredMessages));
};

export const loadMessagesFromStorage = (): Message[] => {
  return getSavedMessages();
};

const getSavedMessages = (): Message[] => {
  const savedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
  return savedMessages ? JSON.parse(savedMessages) : [];
};

export const loadWeeklyData = (): WeeklyData => {
  const messages = getSavedMessages();
  
  if (messages.length === 0) {
    return {
      chatCount: 0,
      moodCounts: [],
      mentalHealthCounts: [],
      startDate: new Date().toISOString(),
      hasFullWeekData: false
    };
  }
  
  // Get the start date from the first message
  const startDate = messages[0].timestamp;
  const daysSinceStart = (new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);
  const hasFullWeekData = daysSinceStart >= 7;
  
  // Count total chat messages
  const chatCount = messages.length;
  
  // Count occurrences of each mood and mental health condition
  const moodMap = new Map<string, number>();
  const mentalHealthMap = new Map<string, number>();
  
  messages.forEach(message => {
    if (message.analysis) {
      if (message.analysis.mood) {
        const currentCount = moodMap.get(message.analysis.mood) || 0;
        moodMap.set(message.analysis.mood, currentCount + 1);
      }
      
      if (message.analysis.mentalHealth) {
        const currentCount = mentalHealthMap.get(message.analysis.mentalHealth) || 0;
        mentalHealthMap.set(message.analysis.mentalHealth, currentCount + 1);
      }
    }
  });
  
  // Convert maps to sorted arrays
  const moodCounts = [...moodMap.entries()].sort((a, b) => b[1] - a[1]);
  const mentalHealthCounts = [...mentalHealthMap.entries()].sort((a, b) => b[1] - a[1]);
  
  return {
    chatCount,
    moodCounts,
    mentalHealthCounts,
    startDate,
    hasFullWeekData
  };
};