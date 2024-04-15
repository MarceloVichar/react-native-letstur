/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#33C8B6',
        secondary: '#33C8B6',
        'base-100': '#FFFFFF',
        'base-200': '#F4F4F4',
        'content-primary': '#161616',
        'content-secondary': '#525252',
        link: '#457AE5',
        success: '#27B46E',
        error: '#F03613',
        warning: '#EDC02C',
        info: '#57B7E8'
      },
    },
  },
  plugins: [],
}

