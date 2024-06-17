/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{astro,ts,tsx}',
    './components/**/*.{astro,ts,tsx}',
    './app/**/*.{astro,ts,tsx}',
    './src/**/*.{astro,ts,tsx}',
  ],
  prefix: "",
  daisyui: {
    themes: ["synthwave", "nord"],
  },
  plugins: [
    require('daisyui'),
  ],
}