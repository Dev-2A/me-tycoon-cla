/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "classic": "url('/themes/classic.jpg')",
        "dango": "url('/themes/dango.gif')",
        "dark": "url('/themes/dark.gif')",
        "forest": "url('/themes/forest.jpg')",
        "galaxy": "url('/themes/galaxy.gif')",
        "gold": "url('/themes/gold.jpg')",
        "matrix": "url('/themes/matrix.gif')",
        "neon": "url('/themes/neon.gif')",
        "ocean": "url('/themes/ocean.gif')",
        "pastel": "url('/themes/pastel.jpg')",
        "sunset": "url('/themes/sunset.jpg')",
        "vintage": "url('/themes/vintage.jpg')",
      },
    },
  },
  plugins: [],
}