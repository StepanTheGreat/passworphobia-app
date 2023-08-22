/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: { 
      colors: {
        "currentColor": "#FF0000",
        "text": "#faf4ef",
        "background": "#13142c",
        "primary": "#2126c0",
        "primary-dark": "#14187d",
        "secondary": "#060723",
        "accent": "#ff6d00",
      },
      fontFamily: {
        "sen": ["Sen", "Arial", "sans-serif"]
      }
    },
  },
  plugins: [],
}

