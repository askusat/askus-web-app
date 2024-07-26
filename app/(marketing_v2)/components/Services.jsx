import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <div className="h-auto relative mb-[40px] ">
      <h1 className="md:text-[32px] text-[#161616] font-poppins font-[700] text-[24px] text-center pt-[30px] md:pt-[40px] ">
        Our Online Legal <br className="md:hidden"/>Assistance <span className="text-[#0023FF]">Services</span>
      </h1>

      <div className="flex justify-center px-[30px] md:px-[50px] lg:px-[80px] xl:px-[100px] mt-[20px] md:mt-[40px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2  w-full ">
          <div className="xl:mt-[10px]">
            <p className="font-poppins font-[600] text-[16px] md:text-[24px] text-[#0477FE] ">
              1. Employment Law Guidance
            </p>
            <p className="font-poppins font-[400] text-[14px] lg:text-[16px] xl:text-[20px] md:text-[20px] text-[#161616]  lg:max-w-[300px] xl:max-w-[500px] mt-[10px]">
              Don’t want to spend hundreds of pounds on legal advice? Get legal
              guidance on employment law from qualified lawyers. Our employment
              legal experts are available 24 hours a day for your assistance.
            </p>
          </div>

          <div className="mt-4 lg:grid  lg:place-items-end lg:w-full">
            <div className="">
              <p className="font-poppins font-[600] text-[16px] md:text-[24px] text-[#0477FE] ">
                2. Criminal Defence
              </p>
              <p className="font-poppins font-[400] text-[14px] md:text-[20px] lg:text-[16px] xl:text-[20px] lg:max-w-[300px]  text-[#161616] xl:max-w-[400px]">
                Protect your rights and achieve the best possible outcome with
                our criminal defense lawyers who specialise in defending against
                criminal charges and legal proceedings.
              </p>
            </div>
          </div>

          <div className="mt-4 lg:mt-[50px]  ">
            <p className="font-poppins lg:max-w-[300px] xl:max-w-max font-[600] text-[16px] md:text-[24px] text-[#0477FE] ">
              3. Family Law and Divorce
            </p>
            <p className="font-poppins font-[400] lg:max-w-[300px] text-[14px] md:text-[20px] lg:text-[16px] xl:text-[20px] text-[#161616]">
              Navigate divorce proceedings, child custody disputes, and family
              law matters with the support of our legal services for divorce.
            </p>
          </div>

          <div className="flex lg:hidden mt-[10px] md:mt-0 justify-center items-center">
            <Image
              src="/lawyer.svg"
              alt=""
              width={475}
              height={674}
              className="mt-4"
            />
          </div>

          <div className="mt-8 lg:mt-[50px] grid  place-items-end w-full">
            <div className="">
              <p className="font-poppins  font-[600] lg:max-w-[300px] xl:max-w-max text-[16px] md:text-[24px] text-[#0477FE] ">
                4. Property and Housing Law
              </p>
              <p className="font-poppins font-[400] text-[14px] lg:text-[16px] xl:text-[20px] md:text-[20px] text-[#161616] lg:max-w-[300px] xl:max-w-[400px]">
                Resolve property disputes, landlord-tenant issues, lease
                agreements, and property sales with guidance from our
                knowledgeable property dispute lawyers.
              </p>
            </div>
          </div>

          <div className="mt-4 lg:mt-[20px] xl:mt-[70px]">
            <p className="font-poppins font-[600] text-[16px] md:text-[24px] text-[#0477FE] ">
              5. Immigration Law
            </p>
            <p className="font-poppins font-[400] text-[14px] lg:text-[16px] md:text-[20px] xl:text-[20px] text-[#161616] lg:max-w-[300px]  xl:max-w-[400px]">
              If you need an immigration lawyer, UK based, then our immigration
              lawyers can help you with visa applications, residency permits,
              citizenship, and other immigration matters.
            </p>
          </div>

          <div className=" mt-[20px] xl:mt-[70px]  grid  place-items-end w-full">
            <div className="">
              <p className="font-poppins font-[600] lg:max-w-[300px] xl:max-w-max text-[16px] md:text-[24px] text-[#0477FE] ">
                6. Business and Corporate Law
              </p>
              <p className="font-poppins font-[400] lg:text-[16px] xl:text-[20px] text-[14px] md:text-[20px] text-[#161616] lg:max-w-[300px] xl:max-w-[400px]">
                Receive business legal support on contract drafting, commercial
                disputes, intellectual property rights, company formation, and
                other business legal issues from our business Law experts.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex absolute lg:left-[36.5%]  xl:left-[32%] max-w-[475px] lg:top-[25%] xl:top-[15%] ">
          <Image
            src="/lawyer.svg"
            alt=""
            width={475}
            height={674}
            className="lg:w-[270px] lg:h-[450px] xl:w-[475px] xl:h-[674px]"
          />
        </div>

            </div>

      <div className="py-[40px] flex justify-center items-center">
        <button className="px-4 py-2 border-[2px] hover:bg-[#0023FF] hover:text-white text-[#0023FF] text-[15px] md:text-[20px] font-[500]  border-[#0023FF] border-solid rounded-[5px] md:rounded-[10px] leading-[18.15px]">
          Get Started
        </button>
      </div>

      {/* Round stuff */}
      <div className="hidden md:flex absolute left-0 top-[40px]">
        <svg
          width="163"
          height="342"
          viewBox="0 0 163 342"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.2"
            d="M-8 328.877C79.1933 328.877 149.877 258.193 149.877 171C149.877 83.8067 79.1933 13.1226 -8 13.1226C-95.1933 13.1226 -165.877 83.8067 -165.877 171C-165.877 258.193 -95.1933 328.877 -8 328.877Z"
            stroke="url(#paint0_linear_177_17)"
            stroke-width="25.7549"
          />
          <defs>
            <linearGradient
              id="paint0_linear_177_17"
              x1="-8"
              y1="26"
              x2="-8"
              y2="316"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#0789FF" />
              <stop offset="1" stop-color="#0477FE" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="hidden md:flex right-0 bottom-0 absolute">
        <svg
          width="201"
          height="342"
          viewBox="0 0 201 342"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.2"
            d="M171 328.877C258.193 328.877 328.877 258.193 328.877 171C328.877 83.8067 258.193 13.1226 171 13.1226C83.8067 13.1226 13.1226 83.8067 13.1226 171C13.1226 258.193 83.8067 328.877 171 328.877Z"
            stroke="url(#paint0_linear_177_15)"
            stroke-width="25.7549"
          />
          <defs>
            <linearGradient
              id="paint0_linear_177_15"
              x1="171"
              y1="26"
              x2="171"
              y2="316"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#0789FF" />
              <stop offset="1" stop-color="#0477FE" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Services;
