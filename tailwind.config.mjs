/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 100%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 100%" },
        }
      },
      animation: {
        gradient: "gradient 10s linear infinite",

      },
      backgroundImage: {
        'sg': "url('/images/sg.png')",
        'sg2': "url('/images/sg2.png')",
        'bg': "url('/images/bg.png')",
        'signup': "url('/images/signup.png')",
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      screens: {
        'print': { 'raw': 'print' },
      }
    },
  },
  plugins: [],
};
