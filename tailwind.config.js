/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/poster/hero-pattern.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'show': 'show 0.3s linear forwards',
      },
      colors: {
        customColor: 'rgb(23,23,23)',
      },
      keyframes:{
        show:{
          '0%':{opacity:0},
          '100%':{opacity:1}
        }
      }
    },
  },
  plugins: [],
}
