// authLayout

import { Image } from "@nextui-org/react";
import React from "react";
import { FaThumbsUp } from "react-icons/fa";

export default function AuthLayout({ children }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 font-PlusJakartaSansRegular">
      <div className="lg:col-span-7 py-3 lg:py-0 w-full min-h-screen lg:h-screen lg:overflow-auto bg-white grid place-items-center relative">
        {children}
      </div>
      <div className="lg:col-span-5 w-full h-full lg:h-screen overflow-auto bg-primary text-white py-10 lg:py-[10px] px-4 lg:px-[50px] lg:grid lg:place-items-center">
        <div className="">
          <Image
            src="/footer.svg"
            alt=""
            width={132}
            height={29}
            className="pt-[30px]"
          />
          <h3 className="mt-4 text-[2rem] lg:text-[2rem] xl:text-[2.2rem] font-bold font-PlusJakartaSansBold text-center lg:text-start">
            Join for £5 and get your answer in few minutes
          </h3>

          <div className="py-6 flex justify-center lg:justify-start">
            <Divider />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-6 items-start justify-start">
              <div className="min-w-[24px] h-auto"><FaThumbsUp size={24} /></div>
              <p className="">
                <span className="font-bold font-PlusJakartaSansBold">
                  Available 24/7
                </span>
                <span>
                  {" "}
                  Get answers from lawyers in minutes, 24/7
                </span>
              </p>
            </div>
            <div className="flex gap-6 items-start justify-start">
              <div className="min-w-[24px] h-auto"><FaThumbsUp size={24} /></div>
              <p className="">
                <span className="font-bold font-PlusJakartaSansBold">
                  Quick and Efficient.
                </span>
                <span>
                  {" "}
                  Save time and money vs. in-person appointments
                </span>
              </p>
            </div>
            <div className="flex gap-6 items-start justify-start">
              <div className="min-w-[24px] h-auto"><FaThumbsUp size={24} /></div>
              <p className="">
                <span className="font-bold font-PlusJakartaSansBold">
                Tailored answers.
                </span>
                <span>
                  {" "}
                  Every answer is bespoke to you and addresses your query without the expensive price tag of in person legal guidance.
                </span>
              </p>
            </div>
          </div>

          <p className="font-semibold text-center mt-[60px]">
            Trusted by 24,000+ customers & businesses
          </p>
        </div>
      </div>
    </div>
  );
}

const Divider = () => {
  return (
    <svg
      width="172"
      height="17"
      viewBox="0 0 172 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8_1324)">
        <path d="M10.584 1.24268L0.583964 16.2427" stroke="#D1D5DB" />
        <path d="M45.584 1.24268L35.584 16.2427" stroke="#D1D5DB" />
        <path d="M80.584 1.24268L70.584 16.2427" stroke="#D1D5DB" />
        <path d="M115.584 1.24268L105.584 16.2427" stroke="#D1D5DB" />
        <path d="M150.584 1.24268L140.584 16.2427" stroke="#D1D5DB" />
        <path d="M17.584 1.24268L7.58396 16.2427" stroke="#D1D5DB" />
        <path d="M52.584 1.24268L42.584 16.2427" stroke="#D1D5DB" />
        <path d="M87.584 1.24268L77.584 16.2427" stroke="#D1D5DB" />
        <path d="M122.584 1.24268L112.584 16.2427" stroke="#D1D5DB" />
        <path d="M157.584 1.24268L147.584 16.2427" stroke="#D1D5DB" />
        <path d="M24.584 1.24268L14.584 16.2427" stroke="#D1D5DB" />
        <path d="M59.584 1.24268L49.584 16.2427" stroke="#D1D5DB" />
        <path d="M94.584 1.24268L84.584 16.2427" stroke="#D1D5DB" />
        <path d="M129.584 1.24268L119.584 16.2427" stroke="#D1D5DB" />
        <path d="M164.584 1.24268L154.584 16.2427" stroke="#D1D5DB" />
        <path d="M31.584 1.24268L21.584 16.2427" stroke="#D1D5DB" />
        <path d="M66.584 1.24268L56.584 16.2427" stroke="#D1D5DB" />
        <path d="M101.584 1.24268L91.584 16.2427" stroke="#D1D5DB" />
        <path d="M136.584 1.24268L126.584 16.2427" stroke="#D1D5DB" />
        <path d="M171.584 1.24268L161.584 16.2427" stroke="#D1D5DB" />
        <path d="M38.584 1.24268L28.584 16.2427" stroke="#D1D5DB" />
        <path d="M73.584 1.24268L63.584 16.2427" stroke="#D1D5DB" />
        <path d="M108.584 1.24268L98.584 16.2427" stroke="#D1D5DB" />
        <path d="M143.584 1.24268L133.584 16.2427" stroke="#D1D5DB" />
      </g>
      <defs>
        <clipPath id="clip0_8_1324">
          <rect
            width="172"
            height="16"
            fill="white"
            transform="translate(0 0.52002)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
