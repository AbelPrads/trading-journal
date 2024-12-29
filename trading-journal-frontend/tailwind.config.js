import HomeDashboard from './src/pages/homeDashboard';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'darkBgDefault': '#16151D',
        'homeNavbar': '#31323F',
        'button': '#14B785',
        'homeAnalytics1': '#2E3644',
        'homeAnalytics2': '#252A35',
        'homeAnalytics3': '#393B3E',
        'tradeSummary': '#6F35C0'
      },
      fontFamily: {
        'albert': ['"Albert Sans"', 'sans-serif'],
      },
      borderColor: {
        'button': '#14B785'
      }
    },
  },
  plugins: [],
}

