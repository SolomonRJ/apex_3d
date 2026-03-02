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
        background: "#0a0a0a",
        foreground: "#fcfcfc",
        gold: {
          300: "#F3E5AB",
          400: "#D4AF37",
          500: "#AA8C2C",
          600: "#806A21",
        },
        dark: {
          800: "#1a1a1a",
          900: "#0a0a0a",
          950: "#050505",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,1) 100%)',
      },
      boxShadow: {
        'glow-gold': '0 0 15px rgba(212, 175, 55, 0.4)',
        'glow-gold-lg': '0 0 25px rgba(212, 175, 55, 0.6)',
      }
    },
  },
  plugins: [],
};
export default config;
