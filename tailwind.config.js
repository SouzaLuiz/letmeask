const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#835AFD',
      danger: '#E73F5D',
      'btn-google': '#EA4335',
      ...colors,
    },
    // extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
