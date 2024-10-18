import React from "react";

import Image from "next/image";

// export const metadata = {
//   title: 'Secure Privacy Practices at AskUs',
//   description: 'Discover how AskUs prioritizes your privacy. Your trusted IT solutions partner. Contact us for expert assistance.'
// }

export default function MembershiponlyPage() {
  return (
    <>
      <div
        className="min-h-screen w-full  pt-20 pb-20 2xl:px-80 xl:px-40 md:px-20 sm:px-10  flex-grow relative bg-cover bg-no-repeat bg-top"
        style={{
          backgroundImage:
            "url(https://ww2.justanswer.co.uk/static/JA45108/background.jpg)",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col md:flex-row md:space-x-4 w-full">
          <div className="w-full lg:w-3/5 p-6 bg-white rounded-md">
            <h1 className="text-2xl font-bold leading-7 mt-7 text-gray-800">
              Join for £5 and get your answer in minutes
            </h1>
            <h2 className="text-base font-normal leading-5 text-gray-800 pt-2">
              Unlimited conversations with solicitors — try 3 days for just £5.
              Then £50/month. Cancel anytime.
            </h2>

            <div className="pt-4">
              <div className="bg-blue-500 rounded-t-md flex items-center max-w-md p-2 relative">
                <div className="mr-3 relative w-12 h-12">
                  <Image
                    src="/lawyer.jpg"
                    alt="Myles"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <span className="absolute top-0 right-0">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_1052:4366)">
                        <path
                          d="M8.93333 1L2 3.90909V8.27273C2 12.3127 4.95437 16.08 8.93333 17C12.9123 16.08 15.8667 12.3127 15.8667 8.27273V3.90909L8.93333 1Z"
                          fill="#00BF8F"
                        />
                      </g>
                      <path
                        d="M8.0444 12.7334L5.19995 10.0143L6.20617 9.05244L8.0444 10.8096L12.7271 6.33337L13.7333 7.29524L8.0444 12.7334Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
                <div className="text-white flex flex-col text-sm leading-4">
                  <div className="mb-1">
                    <b>Myles,</b> <span>Lawyer</span>
                  </div>
                  <div className="flex">
                    <div className="mr-1">
                      <b>36,767</b>
                    </div>
                    <div>Satisfied customers</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 border border-gray-300 rounded-b-md p-3 max-w-md text-sm leading-4">
                <div className="font-bold">
                  {`Here's`} a quick recap of your conversation so far
                </div>
                <div className="mt-2">
                  <ul className="list-disc pl-5">
                    <li>You have an issue with your landlord.</li>
                    <li>
                      You have already tried discussing the problem with them.
                    </li>
                    <li>The specific issue is repair-related.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <span>
                  5 Solicitors are online now and ready to help with your
                  question!
                </span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 ">
            <div className="w-full- max-w-sm- mx-auto-">
              <div className="bg-white/10 border border-gray-300 rounded-md p-4">
                <h5 className="text-sm font-bold tracking-wide leading-5 mb-3 text-white">
                  What our customers say
                </h5>
                <div className="border-t border-gray-300/50 pt-4">
                  <div className="mb-4">
                    <div className="text-xs font-bold leading-4 mb-1 text-white">
                      Emily T., Birmingham
                    </div>
                    <p className="text-sm leading-5 text-white">
                      After spending a substantial amount on consultations with
                      lawyers without finding a satisfactory solution on a
                      business dispute, a friend recommended Askus Anytime. One
                      of the experts there responded to my query within seconds
                      and provided me with the legal guidance that ultimately
                      helped me. Thanks, Askus Anytime!
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-300/50 pt-4">
                  <div className="mb-4">
                    <div className="text-xs font-bold leading-4 mb-1 text-white">
                      Ahmed K., Manchester
                    </div>
                    <p className="text-sm leading-5 text-white">
                      UK immigration lawyers of Askus Anytime were instrumental
                      in helping me secure my visa. They guided me through the
                      entire process and made it seamless. Thank you!
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-300/50 pt-4">
                  <div className="mb-4">
                    <div className="text-xs font-bold leading-4 mb-1 text-white">
                      John S., Jordan
                    </div>
                    <p className="text-sm leading-5 text-white">
                      Askus Anytime provided excellent legal assistance for
                      divorce. They expertly navigated custody issues with
                      empathy, providing crucial support during a challenging
                      time. Their dedication to ensuring the well-being of my
                      family was evident throughout the process, and I highly
                      recommend their legal service for divorce.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
