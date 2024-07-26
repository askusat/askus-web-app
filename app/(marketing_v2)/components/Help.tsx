import Image from "next/image";
import React from "react";

const Help = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#0477FE] to-[#0023FF] px-[30px] lg:px-[100px] flex flex-col md:flex-row items-center  justify-center md:gap-[70px]">
      <div className="py-[25px] md:py-[70px]">
        <Image src="/Hammer.svg" alt="" width={596} height={580} className="" />
      </div>

      <div className="text-[#FFFFFF]">
        <h2 className="max-w-[536px] text-[16px] text-center md:text-start md:text-[18px] lg:text-[26px] xl:text-[32px] md:mt-2 xl:mt-0 font-poppins font-[700]">
          Comprehensive Legal Help Online in Every UK Destination and Overseas
        </h2>
        <p className="mt-[10px] text-center md:text-start xl:mt-[20px] max-w-[776px] text-[14px] lg:text-[18px] xl:text-[20px] font-[400] font-poppins">
          Don’t want to spend hundreds of pounds on legal advice? Get legal
          guidance now from qualified lawyers. Whether you are looking for
          assistance on employment law, navigating family law complexities, or
          dealing with immigration issues, our team of experienced lawyers is
          here to provide you guidance on legal problems.
        </p>

        <div className="my-[30px] md:my-0 flex justify-center md:justify-start md:mt-[15px] lg:mt-[30px] xl:mt-[50px]">
          <button className="hover:bg-white hover:text-[#0023FF] border-[2px] border-white px-4 py-2 md:px-[27px] md:py-[14px]  text-white rounded-[5px] md:rounded-[10px] leading-[18.15px]">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
