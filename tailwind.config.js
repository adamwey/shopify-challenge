const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        grey: colors.neutral,
        green: colors.lime,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
