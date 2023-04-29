/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

const constants ={
  'green': '#0B8A64',
  'dark-green': "#006245",
  'light-green': "#E5F4EF",
  'black': '#222222',
  'red': '#D44040',
  'white': '#ffffff',
  'gray': '#EAE9E5',
  'brown': '#9A958B',
}
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: colors.transparent,
        ...constants
      }
    },
  },
  plugins: [],
}

