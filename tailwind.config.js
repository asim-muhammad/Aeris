/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "chart-legend" : '2fr 1fr'
      },
      screens: {
        "xm" : '500px'
      }
    },
  },
  plugins: [],
}

