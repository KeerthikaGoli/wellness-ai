import React from 'react';
import { Message } from '../types';
import { AlertCircle, ThumbsUp, User, Bot } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
    >
      <div 
        className={`
          max-w-[70%] rounded-lg p-3 shadow-sm
          ${isUser 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }
        `}
      >
        <div className="flex items-center space-x-2 mb-1">
          {isUser ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
          <p className="text-sm font-medium">
            {isUser ? 'You' : 'MindfulChat'}
          </p>
        </div>
        
        <p className="text-sm">{message.content}</p>
        
        {message.analysis && (
          <div className="mt-2 pt-2 border-t border-gray-200 text-xs">
            {message.analysis.mentalHealth && (
              <div className="flex items-center mt-1 text-orange-600">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Detected: {message.analysis.mentalHealth}</span>
              </div>
            )}
            {message.analysis.mood && (
              <div className="flex items-center mt-1 text-purple-600">
                <ThumbsUp className="h-3 w-3 mr-1" />
                <span>Mood: {message.analysis.mood}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;