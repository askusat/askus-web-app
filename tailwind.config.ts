import { nextui } from "@nextui-org/react";
// import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "askUsat-gradient": "linear-gradient(180deg, #0477FE 0%, #0023FF 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#0070F0",
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
    fontFamily: {
      MontserratRegular: "Montserrat-Regular, sans-serif",
      MontserratSemiBold: "Montserrat-SemiBold, sans-serif",
      MontserratBold: "Montserrat-Bold, sans-serif",
      PoppinsRegular: "Poppins-Regular, sans-serif",
      PoppinsSemiBold: "Poppins-SemiBold, sans-serif",
      PoppinsBold: "Poppins-Bold, sans-serif",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      "login-glow": {
        "0%, 100%": {
          boxShadow: "0 0 5px blue",
        },
        "50%": { boxShadow: "0 0 20px blue", },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "login-glow": "login-glow 1s ease-in-out 2",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  // plugins: []
};
export default config;
