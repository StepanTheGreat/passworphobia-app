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
        "secondary": "#140059",
        "accent": "#ff7a1c",
      }
    },
  },
  plugins: [],
}

