import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-[#0477FE] to-[#0023FF]">
      <div className="px-[30px] lg:px-[100px] max-w-[1440px] mx-auto">
        <div className="py-[36px] flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-[#FFFFFF] font-[700] font-poppins text-[16px] md:text-[24px]">
            Contact Askus Anytime today for reliable <br />
            legal assistance in the UK
          </h1>
          <Link href={"/signin"}>
            <button className="mt-[30px] md:mt-0 md:px-[27px] py-2 px-4 md:py-[14px] border border-white text-white rounded-[10px]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-end w-full h-full pb-6 flex-col text-[18px] font-Poppins md:leading-[50.3px] tracking-[1px] text-[#FFFFFF]">
        <div className="text-center mb-4 md:mb-0">
          ©2024 AskUs Limited. All rights reserved.
        </div>
        <div className="flex flex-col md:flex-row items-center md:gap-3 gap-2">
          <Link href="/privacy-policy" className="text-[#FFFFFF]">
            Privacy Policy
          </Link>
          <div className="hidden md:block"> | </div>
          <Link href="/terms-of-service" className="text-[#FFFFFF]">
            Terms of Service
          </Link>
          <div className="hidden md:block"> | </div>
          <Link href="/sitemap" className="text-[#FFFFFF]">
            Sitemap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
