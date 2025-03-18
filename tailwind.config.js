/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#1B2A4A',
          light: '#2A3B5C',
          dark: '#0F1A2E',
        },
      },
    },
  },
  plugins: [],
} 