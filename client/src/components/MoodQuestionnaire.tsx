import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion'; // Animation library

interface Question {
  id: number;
  text: string;
  name: string;
}

const questions: Question[] = [
  { id: 1, text: "I feel energetic and ready to face the day.", name: "q1" },
  { id: 2, text: "I have been sleeping well and waking up refreshed.", name: "q2" },
  { id: 3, text: "I feel motivated to complete my daily tasks.", name: "q3" },
  { id: 4, text: "I have been able to focus on things I start.", name: "q4" },
  { id: 5, text: "I feel connected to the people around me.", name: "q5" },
  { id: 6, text: "I have found joy or satisfaction in small things lately.", name: "q6" },
  { id: 7, text: "I have felt overwhelmed by stress.", name: "q7" },
  { id: 8, text: "I feel confident in handling challenges that come my way.", name: "q8" },
  { id: 9, text: "I have been able to enjoy activities I usually like.", name: "q9" },
  { id: 10, text: "I feel hopeful and positive about the future.", name: "q10" }
];

interface MoodQuestionnaireProps {
  onSubmit: (score: number, answers: Record<string, number>) => void;
}

export default function MoodQuestionnaire({ onSubmit }: MoodQuestionnaireProps) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let totalScore = 0;
    Object.values(answers).forEach(value => {
      totalScore += value;
    });
    onSubmit(totalScore, answers);
  };

  const handleAnswerChange = (questionName: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionName]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
          Mood & Mental Health Questionnaire
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">
          {questions.map((question) => (
            <motion.div 
              key={question.id} 
              whileHover={{ scale: 1.02 }} 
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm"
            >
              <p className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
                {question.id}. {question.text}
              </p>
              <div className="flex justify-around">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="flex flex-col items-center">
                    <input
                      type="radio"
                      name={question.name}
                      value={value}
                      checked={answers[question.name] === value}
                      onChange={() => handleAnswerChange(question.name, value)}
                      className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-indigo-400 transition-all"
                      required
                    />
                    <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">{value}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>1 (Strongly Disagree)</span>
            <span>5 (Strongly Agree)</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-md transition-all"
          >
            Submit Questionnaire
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
