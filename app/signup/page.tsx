"use client";

import React, { useState } from "react";
import AuthLayout from "../components/layout/authLayout";
import { StepOne } from "../components/auth/signup";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetStep = (next:number) => {
    const progressbarEl:any = document.querySelector("#progressbar");
    if (!progressbarEl) return;

    if (next === 3) {
      progressbarEl.style.width = "100%";
      return;
    }
    setStep(next);
    if (next === 1) {
      progressbarEl.style.width = "30%";
    }
    if (next === 2) {
      progressbarEl.style.width = "70%";
      window.location.hash = "#payment";
    }
  };

  return (
    <AuthLayout>
      <div className="absolute top-0 left-0 w-full h-[8px]">
        <div
          id="progressbar"
          className={`bg-primary h-full transition-all duration-300`}
          style={{ width: "30%" }}
        ></div>
      </div>
      <div className="p-[20px] w-full">
        <div
          className={`${
            step !== 1 ? "-ml-[20000px] h-0" : "ml-0"
          } transition-all duration-300 ${
            step === 2 ? "w-fit" : "md:px-[10%] lg:px-[15%] xl:px-[20%]"
          }`}
        >
          <StepOne
            handleSetStep={handleSetStep}
            fullName={fullName}
            setFullName={setFullName}
            setEmail={setEmail}
            email={email}
            password={password}
            setPassword={setPassword}
          />
        </div>

        <div
          className={`${
            step !== 2 ? "-ml-[20000px] h-0" : "ml-0"
          } transition-all duration-300`}
        >
          {/* {step === 2 && (
              <StepTwo
                handleSetStep={handleSetStep}
                step={step}
                userResults={userResults}
              />
            )} */}
        </div>
      </div>
    </AuthLayout>
  );
}
