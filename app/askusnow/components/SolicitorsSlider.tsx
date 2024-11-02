"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

function SolicitorsSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="max-w-[1440px] mx-auto slider-container  m-8  w-11/12 ">
      <Slider {...settings}>
        <div className="slide flex-1  rounded-lg p-2 m-1">
          <div className="rounded-lg relative shadow-md p-4">
            <div className="absolute top-0 right-0 bg-gray-200 text-blue-600 px-4 py-1 text-xs font-bold">
              Expert
            </div>
            <div className="flex fade-in-animation flex-col md:flex-row">
              <div className="mr-1 w-full md:w-2/12">
                <Image
                  src="/Myles.jpeg"
                  alt=""
                  width={80}
                  height={80}
                  className="object-cover w-[80px] h-[80px] md:w-[80px] md:h-[80px] object-center object-cover rounded-full"
                />
              </div>
              <div className="tracking-wide text-sm w-11/12">
                <div className="overflow-hidden">
                  <div className="text-ellipsis overflow-hidden whitespace-nowrap text-base font-semibold">
                    <b>Myles Jones</b>, Lawyer
                  </div>
                  <div className="text-sm">
                    Myles is a US and UK qualified Attorney, Lawyer and
                    Barrister. Myles has over 10 years experience in the legal
                    field working for a wide range different legal practices
                    from multinational law firms to boutique practices, as well
                    as in house for multi-national companies. Myles has a great
                    deal of expertise in a wide range of areas of law.
                  </div>
                </div>
                <div className="flex mt-1">
                  <div className="flex items-center mr-4">
                    {/* Rating Stars */}
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4"
                          fill="#FFB15D"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.8851 0.778037C11.2975 -0.259347 12.7025 -0.259345 13.1149 0.778039L15.5495 6.90087C15.7234 7.3382 16.1166 7.63701 16.568 7.67487L22.8873 8.20479C23.9579 8.29458 24.3921 9.69222 23.5763 10.4231L18.7617 14.7372C18.4178 15.0453 18.2676 15.5288 18.3727 15.9895L19.8436 22.4399C20.0929 23.5328 18.9563 24.3966 18.0396 23.8109L12.6294 20.2C12.243 19.9531 11.757 19.9531 11.3706 20.2L5.96038 23.8109C5.04374 24.3966 3.90714 23.5328 4.15637 22.4399L5.62731 15.9895C5.73238 15.5288 5.58219 15.0453 5.2383 14.7372L0.423675 10.4231C-0.392061 9.69222 0.0420815 8.29458 1.11275 8.20479L7.43203 7.67487C7.88339 7.63701 8.27658 7.3382 8.45047 6.90087L10.8851 0.778037Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-800 text-sm hidden">
                    <span className="font-semibold">36,767</span> Satisfied
                    customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slide flex-1  rounded-lg p-2 m-1">
          <div className="rounded-lg relative shadow-md p-4">
            <div className="absolute top-0 right-0 bg-gray-200 text-blue-600 px-4 py-1 text-xs font-bold">
              Expert
            </div>
            <div className="flex fade-in-animation flex-col md:flex-row">
              <div className="mr-1 w-full md:w-2/12">
                <Image
                  src="/Claudia.jpeg"
                  alt=""
                  width={80}
                  height={80}
                  className="object-cover w-[80px] h-[80px] md:w-[80px] md:h-[80px] object-center object-cover rounded-full"
                />
              </div>
              <div className="tracking-wide text-sm w-11/12">
                <div className="overflow-hidden">
                  <div className="text-ellipsis overflow-hidden whitespace-nowrap text-base font-semibold">
                    <b> Claudia Peters</b>, Lawyer
                  </div>
                  <div className="text-sm">
                    Claudia is a UK qualified lawyer with over 10 years
                    experience in the legal field. Claudia has experience
                    working for the largest law firms in the world, through to
                    working in house for companies and working at small boutique
                    practices. Claudia has helped many customers with their
                    issues and has been praised for her practical, helpful
                    guidance.
                  </div>
                </div>
                <div className="flex mt-1">
                  <div className="flex items-center mr-4">
                    {/* Rating Stars */}
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4"
                          fill="#FFB15D"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.8851 0.778037C11.2975 -0.259347 12.7025 -0.259345 13.1149 0.778039L15.5495 6.90087C15.7234 7.3382 16.1166 7.63701 16.568 7.67487L22.8873 8.20479C23.9579 8.29458 24.3921 9.69222 23.5763 10.4231L18.7617 14.7372C18.4178 15.0453 18.2676 15.5288 18.3727 15.9895L19.8436 22.4399C20.0929 23.5328 18.9563 24.3966 18.0396 23.8109L12.6294 20.2C12.243 19.9531 11.757 19.9531 11.3706 20.2L5.96038 23.8109C5.04374 24.3966 3.90714 23.5328 4.15637 22.4399L5.62731 15.9895C5.73238 15.5288 5.58219 15.0453 5.2383 14.7372L0.423675 10.4231C-0.392061 9.69222 0.0420815 8.29458 1.11275 8.20479L7.43203 7.67487C7.88339 7.63701 8.27658 7.3382 8.45047 6.90087L10.8851 0.778037Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-800 text-sm hidden">
                    <span className="font-semibold">36,767</span> Satisfied
                    customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default SolicitorsSlider;
