/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fdf6e4',
          DEFAULT: '#6b4423', // Nutty Brown
          dark: '#4a2e18',
        },
        accent: {
          DEFAULT: '#f39200', // Farmley-like orange
        },
        background: '#fffcf7',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
