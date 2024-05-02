import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    animation: {
      "fade-in-down": "fade-in-down 0.6s ease-in-out;",
      "spin": "spin 1s linear infinite;",
      "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"
    },
    keyframes: {
      "fade-in-down": {
        "0%": {
          opacity: "0",
          transform: "translateY(-20px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      "spin": {
        "to": {
          transform: 'rotate(360deg)'
        }
      },
      "pulse": {
        "50%": {
          opacity: "0.5"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;