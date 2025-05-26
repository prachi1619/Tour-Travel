/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Indian Flag Theme Colors
        primary: {
          DEFAULT: '#FF9933', // Saffron
          50: '#FFF5EB',
          100: '#FFE4CC',
          200: '#FFD1A8',
          300: '#FFBD85',
          400: '#FFAA61',
          500: '#FF9933', // Base Saffron
          600: '#FF8000',
          700: '#CC6600',
          800: '#994C00',
          900: '#663300'
        },
        secondary: {
          DEFAULT: '#138808', // Green
          50: '#E6F4E6',
          100: '#C2E5C2',
          200: '#9FD69F',
          300: '#7BC77B',
          400: '#57B857',
          500: '#138808', // Base Green
          600: '#107007',
          700: '#0C5405',
          800: '#083804',
          900: '#041C02'
        },
        accent: {
          DEFAULT: '#000080', // Navy Blue
          50: '#E6E6FF',
          100: '#CCCCFF',
          200: '#9999FF',
          300: '#6666FF',
          400: '#3333FF',
          500: '#000080', // Base Navy
          600: '#00006B',
          700: '#000056',
          800: '#000042',
          900: '#00002D'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#121212',
        },
        background: {
          light: '#F8F9FA',
          dark: '#1A1A1A',
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        text: {
          primary: '#000080', // Navy Blue
          secondary: '#475569',
          dark: '#F8FAFC', // Light text for dark mode
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
        navy: {
          50: '#E6E6FF',
          100: '#CCCCFF',
          200: '#9999FF',
          300: '#6666FF',
          400: '#3333FF',
          500: '#000080', // Navy Blue
          600: '#000066',
          700: '#00004D',
          800: '#000033',
          900: '#00001A',
        },
        foreground: {
          DEFAULT: '#000080',
          dark: '#F8FAFC',
        },
      },
      fontFamily: {
        body: ['Nunito', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'], // optional: used for big headings
        sans: ['Inter', 'system-ui', 'sans-serif'], // keep this if you're using 'font-sans'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'gradient-x': 'gradientX 8s ease infinite',
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
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};