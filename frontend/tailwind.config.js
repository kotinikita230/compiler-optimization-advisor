/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0f172a',
        'dark-secondary': '#1e293b',
        'dark-tertiary': '#334155',
      }
    },
  },
  plugins: [],
}
