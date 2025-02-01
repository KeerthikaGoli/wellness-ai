import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Calendar, Download, Trash2, Edit2, Save } from 'lucide-react';
import type { JournalEntry } from '../types';

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleNewEntry = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      content: 'Start writing your thoughts...',
      isAIGenerated: false,
    };
    setEntries([newEntry, ...entries]);
    setEditingId(newEntry.id);
    setEditContent(newEntry.content);
  };

  const handleSave = (id: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, content: editContent } : entry
    ));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleExport = (entry: JournalEntry) => {
    const blob = new Blob([entry.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journal-${entry.timestamp.toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Journal</h1>
            <button
              onClick={handleNewEntry}
              className="btn-primary"
            >
              New Entry
            </button>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-6">
          {entries.map(entry => (
            <div
              key={entry.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{entry.timestamp.toLocaleDateString()}</span>
                  {entry.isAIGenerated && (
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs px-2 py-1 rounded-full">
                      AI Generated
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExport(entry)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(entry.id);
                      setEditContent(entry.content);
                    }}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {editingId === entry.id ? (
                <div className="space-y-4">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="input-field h-48 resize-none dark:bg-gray-700 dark:text-white"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(entry.id)}
                      className="btn-primary"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </div>
              )}
            </div>
          ))}

          {entries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No journal entries yet. Start writing your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}