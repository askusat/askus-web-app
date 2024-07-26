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
        "primary": '#0070F0'
      }
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
    fontFamily: {
      MontserratRegular: 'Montserrat-Regular, sans-serif',
      MontserratSemiBold: 'Montserrat-SemiBold, sans-serif',
      MontserratBold: 'Montserrat-Bold, sans-serif',
      PoppinsRegular: 'Poppins-Regular, sans-serif',
      PoppinsSemiBold: 'Poppins-SemiBold, sans-serif',
      PoppinsBold: 'Poppins-Bold, sans-serif',
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  // plugins: []
};
export default config;
