"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    question: "How can I access legal support online through Askus Anytime?",
    answer:
      "Visit our website to sign up today and start chatting with your experienced lawyers regarding your concerns.",
  },
  {
    question: "What types of legal guidance does Askus Anytime specialise in?",
    answer:
      "AskUs Anytime covers a wide range of areas of law including but not limited to criminal law, family law, property law, immigration law, neighbour disputes, noise complaints, social media/harassment issues and human rights claims.",
  },
  {
    question: "Are your legal assistance services affordable?",
    answer:
      "Our services are very affordable compared to a typical legal service, you can speak to a solicitor now.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="my-[70px]">
      <h2 className="text-[16px] md:text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="flex justify-center flex-col lg:flex-row items-center px-[30px] lg:px-[80px] xl:px-[100px] gap-10">
        <div className="max-w-[800px] w-full p-5">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-[#0023FF]/50 ">
                <div
                  className="_bg-gray-100 md:p-4 cursor-pointer flex justify-between gap-4 md:gap-0 items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-[15px] md:text-[20px] font-poppins text-[#161616] font-[500]">
                    {item.question}
                  </h3>
                  {activeIndex === index ? (
                    // <FaMinus className="text-[#161616]  " />
                    <svg
                      className="text-[#161616]"
                      width="13"
                      height="3"
                      viewBox="0 0 13 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5324 2.5677H7.73565H5.21857H0.421875V0.288086H5.21857H5.23796H7.75504H7.73565H12.5324V2.5677Z"
                        fill="#161616"
                      />
                    </svg>
                  ) : (
                    // <FaPlus className="text-[#161616]  " />
                    <svg
                      className="text-[#161616]"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5326 7.56749H7.73587V12.4829H5.21879V7.56749H0.422095V5.28787H5.21879V0.372444H7.73587V5.28787H12.5326V7.56749Z"
                        fill="#161616"
                      />
                    </svg>
                  )}
                </div>
                {activeIndex === index && (
                  <div className="py-2 md:py-0 md:p-4 text-[14px] md:text-[16px] font-[400] font-poppins">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <Image src="/man.svg" alt="" width={544} height={805} className="" />
        </div>
      </div>
    </div>
  );
};

export default Faq;
