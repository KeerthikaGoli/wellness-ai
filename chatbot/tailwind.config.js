/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#d6e8ff',
          200: '#b0d0ff',
          300: '#7db0ff',
          400: '#4a87ff',
          500: '#1a56ff',
          600: '#0035f5',
          700: '#0029db',
          800: '#0024af',
          900: '#001f8a',
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-green-500',
    'bg-blue-400',
    'bg-blue-600',
    'bg-red-500',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-teal-400',
    'bg-purple-400',
    'bg-purple-600',
    'bg-orange-500',
    'bg-orange-600',
    'bg-gray-500',
    'bg-gray-600',
  ],
};