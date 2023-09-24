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
        "success": "#a3e635",
        "danger": "#dc2626",
        "warning": "#f59e0b"
      },
      fontFamily: {
        "sen": ["Sen", "Arial", "sans-serif"],
      }
    },
  },
  plugins: [],
}

