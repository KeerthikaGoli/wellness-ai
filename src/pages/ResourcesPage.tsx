import React from 'react';
import Layout from '../components/Layout';
import { BookOpen, Video, Phone, Globe, ExternalLink } from 'lucide-react';

const resources = {
  articles: [
    {
      title: "Understanding Anxiety in Young Adults",
      description: "Learn about common anxiety triggers and coping mechanisms.",
      url: "#",
      readTime: "5 min read"
    },
    {
      title: "The Power of Mindfulness",
      description: "Discover how mindfulness can improve your mental well-being.",
      url: "#",
      readTime: "8 min read"
    },
  ],
  videos: [
    {
      title: "Guided Meditation for Stress Relief",
      description: "A 10-minute meditation session for instant calm.",
      url: "#",
      duration: "10 min"
    },
    {
      title: "Understanding Your Emotions",
      description: "Expert insights on emotional intelligence.",
      url: "#",
      duration: "15 min"
    },
  ],
  emergencyContacts: [
    {
      name: "National Crisis Hotline",
      number: "1-800-273-8255",
      available: "24/7"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      available: "24/7"
    },
  ]
};

export default function ResourcesPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mental Health Resources</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Access our curated collection of mental health resources, from educational articles to guided meditations.
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="w-6 h-6 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Emergency Contacts</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                <p className="text-red-600 dark:text-red-400 font-bold">{contact.number}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Available: {contact.available}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-6">
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Educational Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                className="group block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{article.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{article.readTime}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-6">
            <Video className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Video Resources</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.videos.map((video, index) => (
              <a
                key={index}
                href={video.url}
                className="group block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{video.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{video.duration}</p>
              </a>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Additional Resources</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              For more mental health resources and professional support, visit:
            </p>
            <ul>
              <li>
                <a href="https://www.nami.org" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  National Alliance on Mental Illness (NAMI)
                </a>
              </li>
              <li>
                <a href="https://www.samhsa.gov" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Substance Abuse and Mental Health Services Administration (SAMHSA)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}