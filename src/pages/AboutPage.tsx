import React from 'react';
import Layout from '../components/Layout';
import { Shield, Lock, Brain, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About MindfulAI</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              MindfulAI is a revolutionary mental health platform designed specifically for young adults aged 18-23. 
              Our mission is to make mental health support accessible, engaging, and effective through the power of AI 
              and human-centered design.
            </p>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Our Approach</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Support</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI system is trained to provide empathetic, understanding responses while recognizing when to 
                recommend professional help.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User-Centered Design</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Every feature is designed with input from mental health professionals and young adults to ensure 
                maximum effectiveness and engagement.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Protection</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                All your data is encrypted end-to-end and stored securely. We never share your personal information 
                with third parties.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <Lock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Anonymous Mode</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Use our platform anonymously if you prefer. Your privacy is our top priority.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Privacy Policy</h2>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Data Collection</h3>
            <p>
              We collect only the information necessary to provide you with the best possible mental health support:
            </p>
            <ul>
              <li>Chat conversations with our AI</li>
              <li>Mood tracking data</li>
              <li>Journal entries</li>
              <li>User preferences and settings</li>
            </ul>

            <h3>Data Usage</h3>
            <p>
              Your data is used exclusively to:
            </p>
            <ul>
              <li>Provide personalized mental health support</li>
              <li>Improve our AI's understanding and responses</li>
              <li>Generate insights about your mental well-being</li>
              <li>Maintain and improve our services</li>
            </ul>

            <h3>Data Security</h3>
            <p>
              We implement industry-standard security measures:
            </p>
            <ul>
              <li>End-to-end encryption for all data transmission</li>
              <li>Secure data storage with regular backups</li>
              <li>Regular security audits and updates</li>
              <li>Strict access controls and monitoring</li>
            </ul>

            <h3>Your Rights</h3>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Export your data</li>
              <li>Opt-out of data collection</li>
            </ul>

            <h3>Contact Us</h3>
            <p>
              If you have any questions about our privacy policy or data practices, please contact our privacy team at:
              <br />
              Email: privacy@mindfulai.com
              <br />
              Phone: 1-800-MINDFUL
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}