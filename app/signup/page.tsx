"use client";

import React, { useEffect, useState } from "react";
import AuthLayout from "../components/layout/authLayout";
import { SignupStepOne } from "../components/auth/signup";

// export const metadata = {
//   title: 'Sign Up for 24/7 Expert Legal Support - AskUs',
//   description: 'Get instant access to expert lawyers anytime, anywhere. Sign up now for round-the-clock support with AskUs.'
// }

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState("10%");

  useEffect(() => {
    setProgress("30%");
  }, []);

  return (
    <>
      <head>
        <title>Sign Up for 24/7 Expert Legal Support - AskUs</title>
        <meta name="description" content="Get instant access to expert lawyers anytime, anywhere. Sign up now for round-the-clock support with AskUs." />
      </head>
      <AuthLayout>
        <div className="absolute top-0 left-0 w-full h-[8px]">
          <div
            id="progressbar"
            className={`bg-primary h-full transition-all duration-300`}
            style={{ width: progress }}
          ></div>
        </div>
        <div className="p-[20px] w-full">
          <div
            className={`md:px-[10%] lg:px-[15%] xl:px-[20%]`}
          >
            <SignupStepOne
              fullName={fullName}
              setFullName={setFullName}
              username={username}
              setUsername={setUsername}
              setEmail={setEmail}
              email={email}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
