import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message, MessageAnalysis, WeeklyData } from '../types';
import { analyzeMentalHealth, analyzeMood, generateResponse } from '../services/analysisService';
import { saveMessageToStorage, loadMessagesFromStorage, loadWeeklyData } from '../services/storageService';

interface ChatContextProps {
  messages: Message[];
  sendMessage: (content: string) => void;
  showReportModal: boolean;
  openReportModal: () => void;
  closeReportModal: () => void;
  weeklyData: WeeklyData;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

const initialBotMessage: Message = {
  id: 'initial',
  content: "Hi! I'm MindfulChat, your mental health companion. I'm here to chat, listen, and support you through your journey. How are you feeling today?",
  sender: 'bot',
  timestamp: new Date().toISOString()
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [weeklyData, setWeeklyData] = useState<WeeklyData>({
    chatCount: 0,
    moodCounts: [],
    mentalHealthCounts: [],
    startDate: new Date().toISOString(),
    hasFullWeekData: false
  });
  
  // Load saved messages from localStorage on mount
  useEffect(() => {
    const savedMessages = loadMessagesFromStorage();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }
    
    const data = loadWeeklyData();
    setWeeklyData(data);
  }, []);
  
  const sendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    // Get all user messages including the new one
    const userMessages = [...messages.filter(m => m.sender === 'user'), userMessage];
    
    // Check if we have a full week of data
    const oldestMessage = userMessages[0];
    if (oldestMessage) {
      const daysSinceStart = (new Date().getTime() - new Date(oldestMessage.timestamp).getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceStart >= 7) {
        const combinedContent = userMessages.map(m => m.content).join(' ');
        const mentalHealth = analyzeMentalHealth(combinedContent);
        const mood = analyzeMood(combinedContent);
        
        if (mentalHealth || mood) {
          userMessage.analysis = {
            mentalHealth,
            mood
          };
        }
      }
    }
    
    // Update messages state
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Save to localStorage
    saveMessageToStorage(userMessage);
    
    // Generate bot response based on user message and analysis
    setTimeout(() => {
      const responseContent = generateResponse(content, userMessage.analysis || {});
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      saveMessageToStorage(botResponse);
      
      // Update weekly data
      setWeeklyData(loadWeeklyData());
    }, 500);
  };
  
  const openReportModal = () => {
    setWeeklyData(loadWeeklyData()); // Refresh data
    setShowReportModal(true);
  };
  
  const closeReportModal = () => {
    setShowReportModal(false);
  };
  
  return (
    <ChatContext.Provider value={{ 
      messages, 
      sendMessage, 
      showReportModal, 
      openReportModal, 
      closeReportModal,
      weeklyData
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};