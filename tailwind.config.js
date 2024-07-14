/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        telegram: {
          // Light mode colors
          'bg-main': '#F9F9F9',
          'bg-darker': '#03527E',
          'fg-main': '#000000',
          'fg-lighter': '#03527E',
          'fg-bad': '#D70240',
          'fg-okay': '#02BF96',
          'placeholder': '#03527E',
          'highlight': '#03699F',
          'highlight-darker': '#03527E',
          'overlay': '#4242429C',
          'attention-bg': '#F39494',
          'attention-fg': '#D70240',
          'chat-text': '#000000',
          'chat-date': '#03527E',
          'chat-name': '#03527E',

          // Dark mode colors
          'dark-bg-main': '#1E2428',
          'dark-bg-secondary': '#242F3D',
          'dark-fg-main': '#FFFFFF',
          'dark-fg-secondary': '#AAAAAA',
          'dark-highlight': '#2B5278',
        },
      },
    },
  },
  plugins: [],
};
