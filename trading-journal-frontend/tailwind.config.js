import HomeDashboard from './src/pages/homeDashboard/layout/homeDashboard';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'darkBgDefault': '#0a0a0d',
        'homeNavbar': '#262730',
        'button': '#14B785',
        'homeAnalytics1': '#2E3644',
        'homeAnalytics2': '#252A35',
        'homeAnalytics3': '#5A5B5D',
        'tradeSummary': '#7146A7',
      },
      fontFamily: {
        'albert': ['"Albert Sans"', 'sans-serif'],
      },
      borderColor: {
        'button': '#14B785',
        'stroke': '#626262'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { boxShadow: '0 0 5px #fc03a9' },
          '50%': { boxShadow: '0 0 20px #f752c0' },
        },
      },
      animation: {
        pulse: 'pulse 2s linear infinite',
      },
    },
  },
  plugins: [],
}

