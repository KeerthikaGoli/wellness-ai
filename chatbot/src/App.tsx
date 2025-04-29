import React from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <ChatProvider>
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <ChatInterface />
        </main>
      </ChatProvider>
    </div>
  );
}

export default App;