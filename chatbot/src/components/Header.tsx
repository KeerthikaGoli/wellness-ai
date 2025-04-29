import React from 'react';
import { Sparkles, BarChart3 } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import WeeklyReport from './WeeklyReport';

const Header: React.FC = () => {
  const { openReportModal, showReportModal } = useChatContext();
  
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800">MindfulChat</h1>
        </div>
        
        <button 
          onClick={openReportModal}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 transition-colors rounded-lg text-blue-700"
        >
          <BarChart3 className="h-5 w-5" />
          <span className="text-sm font-medium">Weekly Report</span>
        </button>
      </div>

      {showReportModal && <WeeklyReport />}
    </header>
  );
};

export default Header;