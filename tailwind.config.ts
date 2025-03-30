import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        lg: "1024px",
      },
    },
    extend: {
      colors: {
        main: "var(--main)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        destructive: "var(--destructive)",
        overlay: "var(--overlay)",
        bg: "var(--bg)",
        bw: "var(--bw)",
        blank: "var(--blank)",
        text: "var(--text)",
        mtext: "var(--mtext)",
        muted: "var(--muted)",
        border: "var(--border)",
        ring: "var(--ring)",
        ringOffset: "var(--ring-offset)",
      },
      borderRadius: {
        base: "8px",
      },
      boxShadow: {
        shadow: "var(--shadow)",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "6px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-6px",
      },
      fontWeight: {
        base: "400",
        heading: "800",
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        marquee2: "marquee2 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      fontFamily: {
        sans: ["Public Sans", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [tailwindAnimate, tailwindcssTypography],
} satisfies Config;
