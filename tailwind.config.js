/** @type {import('tailwindcss').Config} */
const url = require("url");
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}", "./y/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      ringColor:{
        'teal':'#00A3AF',
      },
      colors:{
        'custom-tale':"#00BABD",
      },
      backgroundImage: {
        'hero-section': "url('/assets/')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
