/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#050b19',
        neon: '#00ffd5',
        glow: '#0ff7e3',
        card: '#0a1120',
        border: '#12213f',
      },
      boxShadow: {
        glow: '0 0 30px rgba(0, 255, 213, 0.12)',
      },
    },
  },
  plugins: [],
};
