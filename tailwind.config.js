/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nokia: {
          screen: '#9ca89c',
          text: '#0f380f',
          plastic: {
            light: '#c5d5e4',
            dark: '#a8b8c8',
          },
        },
      },
      fontFamily: {
        mono: ['"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
