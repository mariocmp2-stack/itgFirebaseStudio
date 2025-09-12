/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'libre-franklin': ['var(--font-libre-franklin)', 'sans-serif'],
      },
      colors: {
        itg: {
          blue: "#0077C8",
          blueLight: "#009BFF",
          ink: "#1F2937",
          gray: "#4B5563",
          soft: "#F9FAFB",
          border: "#E5E7EB",
          footer: "#F3F4F6",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,119,200,.25)",
      },
    },
  },
  plugins: [],
};
