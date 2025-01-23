/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 100%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        ripple: {
          "0%": {
            transform: "scale(1)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(5)",
            opacity: 0,
          },
        },
      },
      animation: {
        gradient: "gradient 10s linear infinite",
        ripple: "ripple 0.7s ease-in-out",
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
    },
  },
  plugins: [],
};
