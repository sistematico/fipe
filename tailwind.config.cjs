/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],

  theme: {
    extend: {},
  },

  plugins: [
    require("daisyui")
  ],

  fontFamily: {
    sans: ['Nunito', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },

  corePlugins: {
    outlineWidth: false,
    objectFit: false,
    objectPosition: false,
  }
}
