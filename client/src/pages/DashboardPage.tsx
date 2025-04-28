import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Brain, MessageCircle, BarChart3, BookOpen, Heart } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'AI Chat',
      description: 'Chat with our AI assistant for personalized support',
      path: '/chat'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Mood Tracker',
      description: 'Track your mood patterns and emotional well-being',
      path: '/mood'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Journal',
      description: 'Document your thoughts and feelings',
      path: '/journal'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Resources',
      description: 'Access helpful mental health resources',
      path: '/resources'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Here's your personalized dashboard to help you on your wellness journey.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* User Details Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {user.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 