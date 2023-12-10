import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import "./globals.css";
import { Providers } from "./providers";

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
          <div className="bg-[#f9f9f9]">
            {children}

            <footer className="flex flex-col bg-[#0580FE] w-full lg:px-[60px] px-[5%]">
              <div className="flex flex-col lg:flex-row justify-between w-full">
                <div className="flex flex-col lg:items-start md:items-center">
                  <Image
                    src="/footer.svg"
                    alt=""
                    width={132}
                    height={29}
                    className="pt-[30px]"
                  />
                  <h1 className="text-[#FFF] lg:mt-[29px] mt-[18px] md:w-[400px] lg:font-PoppinsBold font-PoppinsSemiBold lg:font-[700] lg:tracking-[1px] lg:leading-[50.3px] text-[28px] md:text-center pr-4 md:pr-0 lg:text-start">
                    If you have a question, AskUs
                  </h1>

                  <Button
                    className="lg:mt-[35px] mt-[20px] text-primary max-w-[175px] w-full h-[50px] bg-white rounded-[10px]"
                    size={"lg"}
                  >
                    Get started
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row justify-around gap-8 xl:gap-[100px] mt-[38px]">
                  <div className="flex flex-col  ">
                    <Link
                      href="#"
                      className="text-[28px] font-PoppinsBold font-[700] xl:leading-[50.3px] leading-[30px] tracking-[1px] text-[#FFFFFF]"
                    >
                      General
                    </Link>
                    <Link
                      href="/"
                      className="text-[18px] font-Poppins font-[400] leading-[50.3px] tracking-[1px] text-[#FFFFFF]"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="text-[18px] font-Poppins font-[400] leading-[50.3px] tracking-[1px] text-[#FFFFFF]"
                    >
                      About
                    </Link>
                  </div>

                  <div className="flex flex-col ">
                    <Link
                      href="#"
                      className="text-[28px] font-PoppinsBold font-[700] xl:leading-[50.3px] leading-[30px] tracking-[1px] text-[#FFFFFF]"
                    >
                      How to Subscribe
                    </Link>
                    <Link
                      href="/#why-ask-us"
                      className="text-[18px] font-Poppins font-[400] leading-[50.3px] tracking-[1px] text-[#FFFFFF]"
                    >
                      Why use AskUs
                    </Link>
                    <Link
                      href="#"
                      className="text-[18px] font-Poppins font-[400] leading-[50.3px] tracking-[1px] text-[#FFFFFF]"
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="#"
                      className="text-[18px] font-Poppins font-[400] leading-[50.3px] tracking-[1px] text-[#FFFFFF]"
                    >
                      Subscribers Login
                    </Link>
                  </div>

                  <div className="flex flex-col ">
                    <Link
                      href="#"
                      className="text-[28px] font-PoppinsBold font-[700] xl:leading-[50.3px] leading-[30px] tracking-[1px] text-[#FFFFFF]"
                    >
                      Help
                    </Link>
                    <Link
                      href="faq"
                      className="text-[18px] font-Poppins  leading-[50.3px] tracking-[1px] text-[#FFFFFF]"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="contact-us"
                      className="text-[18px] font-Poppins font-[400] leading-[50.3px] tracking-[1px] text-[#FFFFFF]"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end w-full h-full mb-6 flex-col text-[18px] font-Poppins leading-[50.3px] tracking-[1px] text-[#FFFFFF]">
                <div className="">
                  ©2023 AskUs Limited. All rights reserved.
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/privacy-policy" className="text-[#FFFFFF]">
                    Privacy Policy
                  </Link>
                  <div className=""> | </div>
                  <Link href="/terms-of-service" className="text-[#FFFFFF]">
                    Terms of Service
                  </Link>
                  <div className=""> | </div>
                  <Link href="/sitemap" className="text-[#FFFFFF]">
                    Sitemap
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
