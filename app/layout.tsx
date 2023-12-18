import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "./components/layout/footer";
import { Button } from "@nextui-org/react";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";
import CreateChat from "./components/chat/createChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Askus | Anytime",
  description: "We are ready to answer your questions, day or night.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-MontserratRegular bg-white text-black`}
      >
        <Providers>
          <CreateChat />
          <div className="bg-[#f9f9f9]">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
