const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'black': '#000000',
      'white': '#ffffff',
      'VeryDarkGray': 'hsl(0,0%,17%)',
      'DarkGray': 'hsl(0,0%,50%)',
    },
    extend: {
      backgroundImage:  {
        'hero-pattern': "url('../public/pattern-bg.png')"
      },
      fontFamily:{
        'rubik' : ['Rubik']
      }
    },
  },
  plugins: [],
}