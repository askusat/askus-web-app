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
    img: "/step2.jpg",
    desc: "You can be chatting to a legal expert in minutes.",
  },
  {
    id: 3,
    title: "Get response immediately",
    img: "/step3.JPG",
    desc: "You can ask follow up questions and clarifications until you are satisfied with the answer. We are available 24/7.",
  },
];

export default function HowItWorks() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (step === steps.length) {
        setStep(1);
      } else {
        setStep(step + 1);
      }
    }, 3000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full h-auto bg-[url(/works.svg)] bg-cover bg-no-repeat bg-center py-[62px] px-[60px]">
      <div className="flex items-center gap-4 justify-around">
        <h1 className="font-PoppinsBold text-center max-w-[500px] text-[60px] mb-10 font-bold leading-[66.15px]">
          Expert support in 3 easy steps
        </h1>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            {steps.map((stepz) => (
              <div
                key={`step_button_${stepz.id}`}
                className={`${
                  stepz.id === step ? "bg-[#0580FE] scale-105 text-white"
                 : 'bg-white'} rounded-full w-[50px] h-[50px] flex items-center max-w-full justify-center cursor-pointer hover:bg-[#0580FE] hover:scale-105 hover:text-white ease-in duration-1000 transition-all`}
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
              } max-w-[515px] h-[500px] overflow-hidden bg-white shadow-md border-1 flex-col items-center justify-center flex-start rounded-[46px] transition-all w-[489px]`}
            >
              <div className="flex justify-center items-center flex-col mt-[20px]">
                {" "}
                <Image
                  src={stepz.img}
                  alt=""
                  width={530}
                  height={353}
                  className="w-[300px] h-[203px] "
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <h1 className="font-PoppinsBold mt-[20px] text-[32px] font-700">
                  {stepz.title}
                </h1>
                <p className="mt-[22px] w-full max-w-[400px] min-h-[80px]  text-center">
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
