/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Islamic themed colors
        islamic: {
          primary: '#2D5F3F', // Deep green
          secondary: '#D4AF37', // Gold
          light: '#E8F5E9',
          dark: '#1B4332',
        }
      }
    },
  },
  plugins: [],
}

