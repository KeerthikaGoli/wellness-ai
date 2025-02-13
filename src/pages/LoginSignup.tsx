import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'test@example.com' && password === 'password') {
      alert('Login successful!');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleGoogleLogin = () => {
    alert('Google Login Clicked');
    // Integrate Google Authentication here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">Welcome Back</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">Login to continue</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Login
          </button>
        </form>

        <button 
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full mt-4 p-3 bg-white dark:bg-gray-700 border rounded-lg hover:shadow-md transition-all"
        >
          <FcGoogle className="text-2xl mr-2" />
          Login with Google
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?  
          <span 
            onClick={() => navigate('/signup')} 
            className="text-indigo-600 cursor-pointer hover:underline font-medium"
          >
            Sign up
          </span>
        </p>

        <button 
          onClick={() => navigate('/')} 
          className="w-full mt-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Signup successful!');
    navigate('/login');
  };

  const handleGoogleSignup = () => {
    alert('Google Signup Clicked');
    // Integrate Google Authentication here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">Join Us</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">Create an account to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        <button 
          onClick={handleGoogleSignup}
          className="flex items-center justify-center w-full mt-4 p-3 bg-white dark:bg-gray-700 border rounded-lg hover:shadow-md transition-all"
        >
          <FcGoogle className="text-2xl mr-2" />
          Sign Up with Google
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?  
          <span 
            onClick={() => navigate('/login')} 
            className="text-indigo-600 cursor-pointer hover:underline font-medium"
          >
            Log in
          </span>
        </p>

        <button 
          onClick={() => navigate('/')} 
          className="w-full mt-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
