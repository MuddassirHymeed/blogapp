/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xsm' : '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'primary': '#e7d7c1',
      'secondary' : "#ffe5d9",
      'postpage-bg' : "#e9ecef",
      'subscrib' : '#c2c5aa',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      roboto : ["Roboto", 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}