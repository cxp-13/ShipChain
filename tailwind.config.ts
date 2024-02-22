import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // textColor: {
      //   primary: "rgb(var(--color-primary) / <alpha-value>)",
      //   secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      //   background: "rgb(var(--color-background) / <alpha-value>)",
      //   foreground: "rgb(var(--color-foreground) / <alpha-value>)",
      //   separator: "rgb(var(--color-separator) / <alpha-value>)",
      // },
      // backgroundColor: {
      //   primary: "rgb(var(--color-primary) / <alpha-value>)",
      //   secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      //   background: "rgb(var(--color-background) / <alpha-value>)",
      //   foreground: "rgb(var(--color-foreground) / <alpha-value>)",
      //   separator: "rgb(var(--color-separator) / <alpha-value>)",
      // },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
