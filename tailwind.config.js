const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#835AFD',
      'primary-hover': '#6F4BD8',
      primary_light: '#F4F0FF',
      secondary: '#E559F9',
      danger: '#E73F5D',
      'btn-google': '#EA4335',
      red: colors.red,
      gray: colors.gray,
      white: colors.white,
    },
    fontFamily: {
      body: 'Roboto',
      heading: 'Poppins',
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
