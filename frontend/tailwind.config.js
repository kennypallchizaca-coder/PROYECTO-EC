/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefdf7",
          100: "#d6faee",
          200: "#b0f3de",
          300: "#7be9cb",
          400: "#3fd3b1",
          500: "#1bb99b",
          600: "#0b9480",
          700: "#0b7568",
          800: "#0d5d55",
          900: "#0d4b46"
        }
      }
    }
  },
  plugins: []
};

