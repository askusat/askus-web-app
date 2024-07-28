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
          <Link href={"/#login"}>
            <button className="mt-[30px] md:mt-0 md:px-[27px] py-2 px-4 md:py-[14px] border border-white text-white rounded-[10px]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
