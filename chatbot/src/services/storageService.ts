import { Message, WeeklyData } from '../types';

const MESSAGES_STORAGE_KEY = 'mindfulchat_messages';
const MAX_DAYS_TO_STORE = 7;

/**
 * Saves a message to localStorage
 */
export const saveMessageToStorage = (message: Message): void => {
  const savedMessages = getSavedMessages();
  
  // Add the new message
  savedMessages.push(message);
  
  // Only keep messages from the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - MAX_DAYS_TO_STORE);
  
  const filteredMessages = savedMessages.filter(msg => {
    const msgDate = new Date(msg.timestamp);
    return msgDate >= oneWeekAgo;
  });
  
  // Save back to localStorage
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(filteredMessages));
};

/**
 * Loads messages from localStorage
 */
export const loadMessagesFromStorage = (): Message[] => {
  return getSavedMessages();
};

/**
 * Gets saved messages from localStorage
 */
const getSavedMessages = (): Message[] => {
  const savedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
  return savedMessages ? JSON.parse(savedMessages) : [];
};

/**
 * Loads weekly data for the report
 */
export const loadWeeklyData = (): WeeklyData => {
  const messages = getSavedMessages();
  
  // Count total chat messages in the last 7 days
  const chatCount = messages.length;
  
  // Count occurrences of each mood
  const moodMap = new Map<string, number>();
  
  // Count occurrences of each mental health condition
  const mentalHealthMap = new Map<string, number>();
  
  // Process all messages with analysis
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
  
  // Convert maps to sorted arrays for the report
  const moodCounts = [...moodMap.entries()]
    .sort((a, b) => b[1] - a[1]);
  
  const mentalHealthCounts = [...mentalHealthMap.entries()]
    .sort((a, b) => b[1] - a[1]);
  
  return {
    chatCount,
    moodCounts,
    mentalHealthCounts
  };
};