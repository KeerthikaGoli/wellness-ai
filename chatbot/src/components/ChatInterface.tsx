import React, { useEffect, useRef } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { useChatContext } from '../context/ChatContext';

const ChatInterface: React.FC = () => {
  const { messages, sendMessage } = useChatContext();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="w-full max-w-3xl h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        <div ref={endOfMessagesRef} />
      </div>
      
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatInterface