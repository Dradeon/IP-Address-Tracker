const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'VeryDarkGray': 'hsl(0,0%,17%)',
      'DarkGray': '0,0%,50%',
    },
    extend: {
      fontFamily:{
        'rubik' : ['Rubik']
      }
    },
  },
  plugins: [],
}