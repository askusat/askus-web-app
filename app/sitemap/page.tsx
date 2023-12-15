import React from "react";
import Layout from "../components/layout";
import Link from "next/link";

export default function SitemapPage() {
  return (
    <div className="">
      <Layout />
      <div className="md:px-12 px-6 pb-6">
        <header className="md:min-h-[200px] mb-12 md:mb-0">
          <div className="grid place-items-center text-center">
            <h1 className="font-PoppinsBold font-bold md:text-[48px] text-[28px] uppercase">
              Sitemap
            </h1>
            <p className="lg:max-w-[40%] md:max-w-[60%] mt-3 md:mt-0">
              {`Find answers to commonly asked questions below. If you don't find what you're looking for, feel free to`}{" "}
              <Link href="/contact-us">contact us.</Link>
            </p>
          </div>
        </header>

        <div className="lg:max-w-[60%] md:max-w-[80%] mx-auto flex flex-col lg:flex-col md:flex-row gap-6 mb-20">


          <div className="flex flex-col font-[400] leading-[50.3px] tracking-[1px] ">
          <Link href="/" className="font-bold hover:underline cursor-pointer text-[25px] text-black">General</Link>
            <div className="flex flex-col  leading-[40px]  pl-8">
              <Link href="/" className="font-[500] text-[18px] hover:underline">Home</Link>
              <Link href="/about" className="font-[500] text-[18px] hover:underline">About</Link>
              <Link href="#" className="font-[500] text-[18px] hover:underline">Chat With Expert</Link>
           </div>
          </div>


          <div className="flex flex-col leading-[50.3px] tracking-[1px] ">
            <Link href="/" className="font-bold hover:underline cursor-pointer text-[25px] text-black">How to Subscribe</Link>
            <div className="flex flex-col leading-[40px] pl-8">
              <Link href="/why-ask-us" className="font-[500] text-[18px] hover:underline">Why Use AskUs</Link>
              <Link href="/login" className="font-[500] text-[18px] hover:underline">Subscriber Login</Link>
              <Link href="/login" className="font-[500] text-[18px] hover:underline">Sign Up</Link>
              <Link href="/login" className="font-[500] text-[18px] hover:underline">Sign In</Link>
              <Link href="/login" className="font-[500] text-[18px] hover:underline">Register Up</Link>
            </div>
          </div>

          <div className="flex flex-col leading-[50.3px] tracking-[1px]">
            <Link href="/help" className="font-bold hover:underline  text-[25px] cursor-pointer text-black">Help</Link>
            <div className="flex flex-col leading-[40px]  pl-8">
              <Link href="/faq" className="font-[500] text-[18px] hover:underline">FAQ</Link>
              <Link href="/contact-us" className="font-[500] text-[18px] hover:underline">Contact Us</Link>
              <Link href="#" className="font-[500] text-[18px] hover:underline">Sign Up</Link>
            </div>
          </div>


          <div className="flex flex-col leading-[50.3px] tracking-[1px]">
            <Link href="/" className="font-bold hover:underline cursor-pointer  text-[25px] text-black">Security</Link>
            <div className="flex flex-col leading-[40px]  pl-8">
              <Link href="/privacy-policy" className="font-[500] text-[18px] hover:underline">Privacy Policy</Link>
              <Link href="/terms-of-service" className="font-[500] text-[18px] hover:underline">Term Of Service</Link>
              <Link href="/sitemap" className="font-[500] text-[18px] hover:underline">Sitemap</Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
