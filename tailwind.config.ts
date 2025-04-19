import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        green: {
          500: "#30C649",
          600: "#25A638",
        },
        orange: {
          500: "#FF531D",
        },
      },
      borderRadius: {
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
