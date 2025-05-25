/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF1E6',
          100: '#FFE4CC',
          200: '#FFD1A8',
          300: '#FFB777',
          400: '#FF9D47',
          500: '#FF8400', // Saffron
          600: '#E67600',
          700: '#CC6900',
          800: '#B35B00',
          900: '#994E00',
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
        secondary: {
          50: '#F0FFF4',
          100: '#DCFFE6',
          200: '#B3FFD1',
          300: '#72FF9B',
          400: '#38F56C',
          500: '#138808', // India Green
          600: '#0E6606',
          700: '#0A4404',
          800: '#062C03',
          900: '#031601',
        },
        accent: {
          50: '#E0F2F1',
          100: '#B2DFDB',
          200: '#80CBC4',
          300: '#4DB6AC',
          400: '#26A69A',
          500: '#00796B', // Main accent - Peacock Green
          600: '#00695C',
          700: '#004D40',
          800: '#00352C',
          900: '#002419',
        },
        surface: {
          light: '#FFFFFF', // White
          DEFAULT: '#F8F8F8',
          dark: '#0f172a', // Navy dark
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
        // Semantic aliases for easier dark/light mode usage
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#0f172a',
        },
        foreground: {
          DEFAULT: '#000080',
          dark: '#F8FAFC',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Nunito', 'sans-serif'],
        brand: ['Poppins', 'serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};