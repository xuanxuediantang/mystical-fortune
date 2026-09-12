import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mystical: {
          purple: "#7C3AED",
          gold: "#F59E0B",
          dark: "#0F0A1A",
          card: "#1A1225",
          border: "#2D1F3D",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mystical-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "dark-gradient": "linear-gradient(180deg, #0F0A1A 0%, #1A1225 50%, #0F0A1A 100%)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #7C3AED, 0 0 10px #7C3AED" },
          "100%": { boxShadow: "0 0 20px #7C3AED, 0 0 30px #F59E0B" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
