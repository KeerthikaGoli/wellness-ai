import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Send, Mic, StopCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to listen and support you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [currentMood, setCurrentMood] = useState<string>('neutral');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand how you're feeling. Would you like to talk more about it?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const getMoodColor = () => {
    const moodColors = {
      happy: 'bg-mood-happy',
      calm: 'bg-mood-calm',
      neutral: 'bg-mood-neutral',
      sad: 'bg-mood-sad',
      anxious: 'bg-mood-anxious',
    };
    return moodColors[currentMood as keyof typeof moodColors] || 'bg-mood-neutral';
  };

  return (
    <Layout>
      <div className={`min-h-[calc(100vh-12rem)] transition-colors duration-500 ${getMoodColor()} bg-opacity-5 rounded-xl p-4 md:p-6`}>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
            <div className="space-y-4 mb-4 h-[60vh] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <p className="text-sm md:text-base">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 input-field dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                onClick={toggleRecording}
                className={`p-2 rounded-full ${
                  isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-100 hover:bg-gray-200'
                } transition-colors`}
              >
                {isRecording ? (
                  <StopCircle className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <button
                onClick={handleSend}
                className="btn-primary rounded-full p-2"
                disabled={!inputText.trim()}
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}