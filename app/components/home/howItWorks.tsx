"use client";

import { Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    title: "Ask your question",
    img: "/people.svg",
    desc: "Tell us your legal query. Any topic, any time.",
  },
  {
    id: 2,
    title: "Connect with an expert",
    img: "/step2.svg",
    desc: "You can be chatting to a legal expert in minutes.",
  },
  {
    id: 3,
    title: "Get response immediately",
    img: "/step3.svg",
    desc: "You can ask follow up questions and clarifications until you are satisfied with the answer. We are available 24/7.",
  },
];

export default function HowItWorks() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prevStep) => (prevStep === steps.length ? 1 : prevStep + 1));
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="w-full h-auto bg-[url(/works.svg)] bg-cover bg-no-repeat bg-center lg:py-[62px] lg:px-[60px] px-[5%]">
      <div className="flex flex-col lg:flex-row items-center gap-4 justify-around">
        <h2 className="font-PoppinsBold text-center max-w-[500px] xl:text-[60px] text-[36px] mb-10 font-bold xl:leading-[66.15px] leading-[40px]">
          Expert support in 3 easy steps
        </h2>

        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="flex md:flex-col items-center gap-4">
            {steps.map((stepz) => (
              <div
                key={`step_button_${stepz.id}`}
                className={`${
                  stepz.id === step ? "bg-[#0580FE] scale-105 text-white"
                 : 'bg-white'} rounded-full md:w-[50px] md:h-[50px] w-[40px] h-[40px] flex items-center max-w-full justify-center cursor-pointer hover:bg-[#0580FE] hover:scale-105 hover:text-white ease-in duration-1000 transition-all`}
                onClick={() => setStep(stepz.id)}
              >
                <p className="w-full text-center text-[20px]">{stepz.id}</p>
              </div>
            ))}
          </div>

          {steps.map((stepz) => (
            <div
              key={`step_main_${stepz.id}`}
              className={`${
                stepz.id === step ? "flex" : "hidden"
              } xl:max-w-[515px] md:max-w-[424px] xl:h-[500px] md:h-[480px] overflow-hidden bg-white shadow-md border-1 flex-col items-center justify-center flex-start md:rounded-[46px] rounded-[16px] transition-all md:w-[489px]`}
            >
              <div className="flex justify-center items-center flex-col mt-[20px]">
                {" "}
                <Image
                  src={stepz.img}
                  alt="steps-image"
                  width={300}
                  className="w-[300px] h-auto transition-all duration-300"
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="font-PoppinsBold mt-[20px] xl:text-[32px] text-[24px] font-700 text-center md:text-start">
                  {stepz.title}
                </div>
                <p className="xl:mt-[22px] mt-[18px] w-full xl:max-w-[400px] max-w-[300px] min-h-[80px]  text-center xl:text-base text-sm">
                  {stepz.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
