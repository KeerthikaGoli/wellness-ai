import React from 'react';
import Layout from '../components/Layout';
import { MessageCircle, BarChart3, BookOpen, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const redirectToChatbot = () => {
    window.open('https://coruscating-selkie-8d7eba.netlify.app/', '_blank'); // Open the chatbot in a new tab
    navigate('/dashboard'); // Redirect to dashboard after opening the chatbot
  };

  return (
    <Layout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Your Mental Wellness Journey
            <span className="text-indigo-600 dark:text-indigo-400"> Starts Here</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience personalized AI-powered support, mood tracking, and journaling tools designed to help you understand and improve your mental well-being.
          </p>
          <button
            onClick={redirectToChatbot}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
          >
            Talk to AI Assistant
          </button>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[{ 
              icon: <MessageCircle className="w-8 h-8 text-indigo-600" />,
              title: "AI Chat Support",
              description: "24/7 empathetic conversation with our AI assistant",
              onClick: redirectToChatbot
            },
            {
              icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
              title: "Mood Tracking",
              description: "Visual insights into your emotional patterns",
              onClick: () => navigate('/mood')
            },
            {
              icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
              title: "Smart Journaling",
              description: "AI-assisted journaling for better self-reflection",
              onClick: () => navigate('/journal')
            },
            {
              icon: <Heart className="w-8 h-8 text-indigo-600" />,
              title: "Wellness Resources",
              description: "Curated content for mental health support",
              onClick: () => navigate('/resources')
            }
          ].map((feature, index) => (
            <div
              key={index}
              onClick={feature.onClick}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="space-y-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose MindfulAI?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[{ title: "Private & Secure", value: "End-to-end encryption" },
                { title: "Always Available", value: "24/7 Support" },
                { title: "Research Backed", value: "Evidence-based approach" }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join thousands of others who have taken the first step towards better mental health.
          </p>
          <div className="space-x-4">
            <button
              onClick={redirectToChatbot}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
            >
              Start Now
            </button>
            <button
              onClick={() => navigate('/about')}
              className="bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 border border-indigo-600"
            >
              Learn More
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
