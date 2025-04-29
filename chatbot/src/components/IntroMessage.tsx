import React from 'react';
import { Heart, MessageCircle, Shield } from 'lucide-react';

const IntroMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 space-y-6 animate-fadeIn">
      <div className="bg-blue-100 p-3 rounded-full">
        <Heart className="h-10 w-10 text-blue-500" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800">Welcome to MindfulChat</h2>
      
      <p className="text-gray-600 max-w-md">
        I'm here to chat, listen, and offer support for your mental well-being. 
        Feel free to share how you're feeling today!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg w-full mt-4">
        <Feature 
          icon={<MessageCircle className="h-5 w-5 text-blue-500" />}
          title="Friendly Chat"
          description="Talk naturally like you would with a friend"
        />
        <Feature 
          icon={<Heart className="h-5 w-5 text-blue-500" />}
          title="Mood Tracking"
          description="I'll help detect your feelings and moods"
        />
        <Feature 
          icon={<Shield className="h-5 w-5 text-blue-500" />}
          title="Private & Secure"
          description="Your data stays in your browser"
        />
      </div>
    </div>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-center mb-2">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-800">{title}</h3>
      <p className="text-xs text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default IntroMessage;