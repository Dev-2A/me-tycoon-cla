/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /^theme-/,
    },
  ],
  theme: {
    extend: {
      backgroundImage: {
        classic: "url('/themes/classic.jpg')",
        bubblegum: "url('/themes/dango.gif')",
        dark: "url('/themes/dark.gif')",
        forest: "url('/themes/forest.jpg')",
        galaxy: "url('/themes/galaxy.gif')",
        gold: "url('/themes/gold.jpg')",
        matrix: "url('/themes/matrix.gif')",
        neon: "url('/themes/neon.gif')",
        ocean: "url('/themes/ocean.gif')",
        pastel: "url('/themes/pastel.jpg')",
        sunset: "url('/themes/sunset.jpg')",
        vintage: "url('/themes/vintage.jpg')",
      },
      transitionProperty: {
        scale: 'transform',
        spacing: 'margin, padding',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': {  transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        coinDrop: {
          '0%': { transform: 'translateY(-50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        pop: 'pop 0.3s ease-in-out',
        fadeInOut: 'fadeInOut 2s ease-in-out',
        shake: 'shake 0.5s ease-in-out',
        coinDrop: 'coinDrop 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
