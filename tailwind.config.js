/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Include index.html in the root
    './src/**/*.{js,ts,jsx,tsx}', // Scan all JS, TS, JSX, TSX files inside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
