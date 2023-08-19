/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: { 
      colors: {
        "currentColor": "#FF0000",
        "text": "#faf4ef",
        "background": "#13142c",
        "primary": "#1c21aa",
        "primary-dark": "#14187d",
        "secondary": "#140059",
        "accent": "#ff7a1c",
      },
      fontFamily: {
        "sen": ["Sen", "Arial", "sans-serif"]
      }
    },
  },
  plugins: [],
}

