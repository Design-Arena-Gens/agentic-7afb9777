import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-space-grotesk)"],
        sans: ["var(--font-space-grotesk)"]
      },
      colors: {
        base: {
          900: "#060712",
          800: "#0c1022",
          700: "#141932"
        },
        accent: {
          pink: "#ff6bd6",
          blue: "#4ed4ff",
          purple: "#8b5cf6"
        }
      },
      backdropBlur: {
        xs: "2px"
      },
      boxShadow: {
        neon: "0 0 40px rgba(78, 212, 255, 0.45)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04), 0 20px 40px rgba(6,7,18,0.65)"
      },
      animation: {
        "slow-spin": "slowSpin 20s linear infinite",
        "pulse-glow": "pulseGlow 3.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
        "glitch": "glitch 2s linear infinite"
      },
      keyframes: {
        slowSpin: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 20px rgba(78, 212, 255, 0.8))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 35px rgba(255, 107, 214, 0.8))" }
        },
        float: {
          "0%, 100%": { transform: "translateY(-4px)" },
          "50%": { transform: "translateY(4px)" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        glitch: {
          "0%": { transform: "skewX(0deg)" },
          "20%": { transform: "skewX(-5deg)" },
          "40%": { transform: "skewX(5deg)" },
          "60%": { transform: "skewX(0deg)" },
          "80%": { transform: "skewX(3deg)" },
          "100%": { transform: "skewX(0deg)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
