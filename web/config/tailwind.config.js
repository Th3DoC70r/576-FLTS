/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/html/utils/withMT')

module.exports = withMT({
  content: [
    'src/**/*.{js,jsx,ts,tsx}',
    '../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    '../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        LightBlue: '#A3C7D2',
        Blue: '#001489',
        Red: '#B9322F',
        Yellow: '#FFCD00',
        Green: '#00843D',
      },
    },
  },
  plugins: [],
})
