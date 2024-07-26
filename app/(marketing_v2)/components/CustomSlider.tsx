"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";


function CustomSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    centerMode: true,
    centerPadding: "20%",
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          centerPadding: "15%",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "25%",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "25%",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "10%",
        },
      },
    ],
  };

  return (
    <div className="slider-container  mt-8 w-[100vw] mb-8">
      <Slider {...settings}>
        <div className="slide bg-white rounded-lg h-[270px] md:h-[400px] p-2 md:p-5 lg:p-4 xl:p-6">
        <div className=" flex justify-between items-start">
            <div className="flex  items-center gap-2 md:gap-[16px]">
              <Image src="/Emily.svg" alt="" width={80} height={80} className="w-[44px] h-[44px] md:w-[80px] md:h-[80px] object-center object-contain"/>
              <div className="flex flex-col">
                <h1 className="text-[14px]  md:text-[18px] font-poppins  font-[700] text-[#0477FE] ">
                Emily T., Birmingham
                </h1>

                <div className="md:mt-[15px]">
                  <svg
                    width="110"
                    height="20"
                    viewBox="0 0 110 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[89px] h-[16px] md:w-[110px] md:h-[20px] "
                  >
                    <g clip-path="url(#clip0_177_120)">
                      <path
                        d="M9.49275 1.6416L11.8952 6.78374L17.2677 7.61339L13.3802 11.6137L14.2977 17.2652L9.49275 14.5955L4.68781 17.2652L5.60526 11.6137L1.71777 7.61339L7.09028 6.78374L9.49275 1.6416Z"
                        fill="#FF7F00"
                        stroke="#FF7F00"
                        stroke-width="1.64286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <g clip-path="url(#clip1_177_120)">
                      <path
                        d="M54.5875 1.6416L56.9899 6.78374L62.3624 7.61339L58.475 11.6137L59.3924 17.2652L54.5875 14.5955L49.7825 17.2652L50.7 11.6137L46.8125 7.61339L52.185 6.78374L54.5875 1.6416Z"
                        fill="#FF7F00"
                        stroke="#FF7F00"
                        stroke-width="1.64286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <path
                      d="M32.0406 1.6416L34.4431 6.78374L39.8156 7.61339L35.9281 11.6137L36.8455 17.2652L32.0406 14.5955L27.2357 17.2652L28.1531 11.6137L24.2656 7.61339L29.6381 6.78374L32.0406 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M77.1353 1.6416L79.5378 6.78374L84.9103 7.61339L81.0228 11.6137L81.9403 17.2652L77.1353 14.5955L72.3304 17.2652L73.2478 11.6137L69.3604 7.61339L74.7329 6.78374L77.1353 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M99.6822 1.6416L102.085 6.78374L107.457 7.61339L103.57 11.6137L104.487 17.2652L99.6822 14.5955L94.8773 17.2652L95.7947 11.6137L91.9072 7.61339L97.2797 6.78374L99.6822 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <clipPath id="clip0_177_120">
                        <rect
                          width="18.6599"
                          height="19.7143"
                          fill="white"
                          transform="translate(0.163086)"
                        />
                      </clipPath>
                      <clipPath id="clip1_177_120">
                        <rect
                          width="18.6599"
                          height="19.7143"
                          fill="white"
                          transform="translate(45.2578)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <div className=" mt-2 md:mt-2 items-center flex text-[10px] md:text-[14px]">2 March, 2024 </div>
          </div>

          <p className="mt-4 text-[12px] md:text-[16px] xl:text-[18px] 2xl:text-[20px] font-[400] font-poppins">
          After spending a substantial amount on consultations with lawyers without finding a satisfactory solution on a business dispute, a friend recommended Askus Anytime. One of the experts there responded to my query within seconds and provided me with the legal guidance that ultimately helped me. Thanks, Askus Anytime!
          </p>
        </div>

        <div className="slide bg-white rounded-lg h-[270px] md:h-[400px] p-2 md:p-5 lg:p-4 xl:p-6">
        <div className=" flex justify-between items-start">
            <div className="flex items-center gap-2 md:gap-[16px]">
              <Image src="/Jake.svg" alt="" width={80} height={80} className="w-[44px] h-[44px] md:w-[80px] md:h-[80px] object-center object-contain"/>
              <div className="flex flex-col">
                <h1 className="text-[14px]  md:text-[18px] font-poppins  font-[700] text-[#0477FE] ">
                Ahmed K., Manchester
                </h1>

                <div className="md:mt-[15px]">
                  <svg
                    width="110"
                    height="20"
                    viewBox="0 0 110 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[89px] h-[16px] md:w-[110px] md:h-[20px] "
                  >
                    <g clip-path="url(#clip0_177_120)">
                      <path
                        d="M9.49275 1.6416L11.8952 6.78374L17.2677 7.61339L13.3802 11.6137L14.2977 17.2652L9.49275 14.5955L4.68781 17.2652L5.60526 11.6137L1.71777 7.61339L7.09028 6.78374L9.49275 1.6416Z"
                        fill="#FF7F00"
                        stroke="#FF7F00"
                        stroke-width="1.64286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <g clip-path="url(#clip1_177_120)">
                      <path
                        d="M54.5875 1.6416L56.9899 6.78374L62.3624 7.61339L58.475 11.6137L59.3924 17.2652L54.5875 14.5955L49.7825 17.2652L50.7 11.6137L46.8125 7.61339L52.185 6.78374L54.5875 1.6416Z"
                        fill="#FF7F00"
                        stroke="#FF7F00"
                        stroke-width="1.64286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <path
                      d="M32.0406 1.6416L34.4431 6.78374L39.8156 7.61339L35.9281 11.6137L36.8455 17.2652L32.0406 14.5955L27.2357 17.2652L28.1531 11.6137L24.2656 7.61339L29.6381 6.78374L32.0406 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M77.1353 1.6416L79.5378 6.78374L84.9103 7.61339L81.0228 11.6137L81.9403 17.2652L77.1353 14.5955L72.3304 17.2652L73.2478 11.6137L69.3604 7.61339L74.7329 6.78374L77.1353 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M99.6822 1.6416L102.085 6.78374L107.457 7.61339L103.57 11.6137L104.487 17.2652L99.6822 14.5955L94.8773 17.2652L95.7947 11.6137L91.9072 7.61339L97.2797 6.78374L99.6822 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <clipPath id="clip0_177_120">
                        <rect
                          width="18.6599"
                          height="19.7143"
                          fill="white"
                          transform="translate(0.163086)"
                        />
                      </clipPath>
                      <clipPath id="clip1_177_120">
                        <rect
                          width="18.6599"
                          height="19.7143"
                          fill="white"
                          transform="translate(45.2578)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <div className=" mt-2 md:mt-2 items-center flex text-[10px] md:text-[14px]">2 March, 2024 </div>
          </div>

          <p className="mt-4 text-[12px] md:text-[16px] xl:text-[18px] 2xl:text-[20px] font-[400] font-poppins">
          UK immigration lawyers of Askus Anytime were instrumental in helping me secure my visa. They guided me through the entire process and made it seamless. Thank you!
          </p>
        </div>


        <div className="slide bg-white rounded-lg h-[270px] md:h-[400px] p-2 md:p-5 lg:p-4 xl:p-6">
        <div className=" flex justify-between items-start">
            <div className="flex items-center gap-0 md:gap-[16px]">
              <Image src="/Image.svg" alt="" width={80} height={80} className="w-[44px] h-[44px] md:w-[80px] md:h-[80px] object-center object-contain"/>
              <div className="flex flex-col">
                <h1 className="text-[13px] md:text-[18px] font-poppins  font-[700] text-[#0477FE] ">
                  John S., Jordan
                </h1>

                <div className="md:mt-[15px]">
                  <svg
                    width="110"
                    height="20"
                    viewBox="0 0 110 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[89px] h-[16px] md:w-[110px] md:h-[20px] "
                  >
                    <g clip-path="url(#clip0_177_120)">
                      <path
                        d="M9.49275 1.6416L11.8952 6.78374L17.2677 7.61339L13.3802 11.6137L14.2977 17.2652L9.49275 14.5955L4.68781 17.2652L5.60526 11.6137L1.71777 7.61339L7.09028 6.78374L9.49275 1.6416Z"
                        fill="#FF7F00"
                        stroke="#FF7F00"
                        stroke-width="1.64286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <g clip-path="url(#clip1_177_120)">
                      <path
                        d="M54.5875 1.6416L56.9899 6.78374L62.3624 7.61339L58.475 11.6137L59.3924 17.2652L54.5875 14.5955L49.7825 17.2652L50.7 11.6137L46.8125 7.61339L52.185 6.78374L54.5875 1.6416Z"
                        fill="#FF7F00"
                        stroke="#FF7F00"
                        stroke-width="1.64286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <path
                      d="M32.0406 1.6416L34.4431 6.78374L39.8156 7.61339L35.9281 11.6137L36.8455 17.2652L32.0406 14.5955L27.2357 17.2652L28.1531 11.6137L24.2656 7.61339L29.6381 6.78374L32.0406 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M77.1353 1.6416L79.5378 6.78374L84.9103 7.61339L81.0228 11.6137L81.9403 17.2652L77.1353 14.5955L72.3304 17.2652L73.2478 11.6137L69.3604 7.61339L74.7329 6.78374L77.1353 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M99.6822 1.6416L102.085 6.78374L107.457 7.61339L103.57 11.6137L104.487 17.2652L99.6822 14.5955L94.8773 17.2652L95.7947 11.6137L91.9072 7.61339L97.2797 6.78374L99.6822 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <clipPath id="clip0_177_120">
                        <rect
                          width="18.6599"
                          height="19.7143"
                          fill="white"
                          transform="translate(0.163086)"
                        />
                      </clipPath>
                      <clipPath id="clip1_177_120">
                        <rect
                          width="18.6599"
                          height="19.7143"
                          fill="white"
                          transform="translate(45.2578)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <div className=" mt-2 md:mt-2 items-center flex  text-[10px] md:text-[14px]">2 March, 2024 </div>
          </div>

          <p className="mt-4 text-[12px] md:text-[16px] xl:text-[18px] 2xl:text-[20px] font-[400] font-poppins">
          Askus Anytime provided excellent legal assistance for divorce. They expertly navigated custody issues with empathy, providing crucial support during a challenging time. Their dedication to ensuring the well-being of my family was evident throughout the process, and I highly recommend their legal service for divorce.
          </p>
        </div>

        <div className="slide bg-white rounded-lg h-[270px] md:h-[400px] p-2 md:p-5 lg:p-4 xl:p-6">
        <div className=" flex justify-between items-start">
            <div className="flex items-center gap-0 md:gap-[16px]">
              <Image src="/Image.svg" alt="" width={80} height={80} className="w-[44px] h-[44px] md:w-[80px] md:h-[80px] object-center object-contain"/>
              <div className="flex flex-col">
                <h1 className="text-[14px] md:text-[18px] font-poppins  font-[700] text-[#0477FE] ">
                  John S., London
                </h1>

                <div className="md:mt-[15px]">
                  <svg
                    width="110"
                    height="20"
                    viewBox="0 0 110 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[89px] h-[16px] md:w-[110px] md:h-[20px] "
                  >
                    <g clip-path="url(#clip0_177_120)">
                      <path
                        d="M9.49275 1.6416L11.8952 6.78374L17.2677 7.61339L13.3802 11.6137L14.2977 17.2652L9.49275 14.5955L4.68781 17.2652L5.60526 11.6137L1.71777 7.61339L7.09028 6.78374L9.49275 1.6416Z"
                        fill="#FF7F00"
                        stroke="#FF7F00"
                        stroke-width="1.64286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <g clip-path="url(#clip1_177_120)">
                      <path
                        d="M54.5875 1.6416L56.9899 6.78374L62.3624 7.61339L58.475 11.6137L59.3924 17.2652L54.5875 14.5955L49.7825 17.2652L50.7 11.6137L46.8125 7.61339L52.185 6.78374L54.5875 1.6416Z"
                        fill="#FF7F00"
                        stroke="#FF7F00"
                        stroke-width="1.64286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <path
                      d="M32.0406 1.6416L34.4431 6.78374L39.8156 7.61339L35.9281 11.6137L36.8455 17.2652L32.0406 14.5955L27.2357 17.2652L28.1531 11.6137L24.2656 7.61339L29.6381 6.78374L32.0406 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M77.1353 1.6416L79.5378 6.78374L84.9103 7.61339L81.0228 11.6137L81.9403 17.2652L77.1353 14.5955L72.3304 17.2652L73.2478 11.6137L69.3604 7.61339L74.7329 6.78374L77.1353 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M99.6822 1.6416L102.085 6.78374L107.457 7.61339L103.57 11.6137L104.487 17.2652L99.6822 14.5955L94.8773 17.2652L95.7947 11.6137L91.9072 7.61339L97.2797 6.78374L99.6822 1.6416Z"
                      fill="#FF7F00"
                      stroke="#FF7F00"
                      stroke-width="1.64286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <clipPath id="clip0_177_120">
                        <rect
                          width="18.6599"
                          height="19.7143"
                          fill="white"
                          transform="translate(0.163086)"
                        />
                      </clipPath>
                      <clipPath id="clip1_177_120">
                        <rect
                          width="18.6599"
                          height="19.7143"
                          fill="white"
                          transform="translate(45.2578)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <div className=" mt-2 md:mt-2 items-center flex text-[10px] md:text-[14px]">2 March, 2024 </div>
          </div>

          <p className="mt-4 text-[12px] md:text-[16px] xl:text-[18px] 2xl:text-[20px] font-[400] font-poppins">
            Askus Anytime provided excellent legal assistance for my employment
            issue. They were responsive, knowledgeable about my query on legal
            support on employment law. Their professionalism and clear
            communication made a significant difference in resolving my query
            effectively.
          </p>
        </div>

        {/* <div className="slide bg-white rounded-lg h-[300px] p-6">
          <Image src="/image2.jpg" alt="Slide 2" width={250} height={250} />
          <p className="mt-4 text-lg font-medium">Slide 2 Content</p>
        </div>
        <div className="slide bg-white rounded-lg h-[300px] p-6">
          <Image src="/image3.jpg" alt="Slide 3" width={250} height={250} />
          <p className="mt-4 text-lg font-medium">Slide 3 Content</p>
        </div>
        <div className="slide bg-white rounded-lg h-[300px] p-6">
          <Image src="/image4.jpg" alt="Slide 4" width={250} height={250} />
          <p className="mt-4 text-lg font-medium">Slide 4 Content</p>
        </div> */}
      </Slider>
    </div>
  );
}

export default CustomSlider;
