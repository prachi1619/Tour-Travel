/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff2ed',
          100: '#ffe0d4',
          200: '#ffc2a9',
          300: '#ff9a72',
          400: '#ff7040',
          500: '#ff5722', // Main primary
          600: '#f43b00',
          700: '#cc3000',
          800: '#a22700',
          900: '#852400',
        },
        secondary: {
          50: '#e9f1fd',
          100: '#cfdffb',
          200: '#a3c5f6',
          300: '#6aa3ef',
          400: '#3a85e8',
          500: '#1a73e8', // Main secondary
          600: '#155cc7',
          700: '#13459b',
          800: '#123b80',
          900: '#11326a',
        },
        accent: {
          50: '#e9f5ed',
          100: '#ceead8',
          200: '#a4d7b4',
          300: '#79c38f',
          400: '#50ad6c',
          500: '#2e7d32', // Main accent
          600: '#236724',
          700: '#1b511c',
          800: '#164117',
          900: '#123614',
        },
        success: {
          500: '#4caf50',
        },
        warning: {
          500: '#ff9800',
        },
        error: {
          500: '#f44336',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};