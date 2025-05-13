/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7c3aed", // purple-600
          hover: "#6d28d9", // purple-700
          light: "#ede9fe", // purple-100
          dark: "#4c1d95", // purple-900
        }
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  darkMode: 'class', // This ensures dark mode is only applied when the 'dark' class is present
  plugins: [],
}