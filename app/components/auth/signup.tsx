"use client";

import { SignUpParam } from "@/app/context/AuthProvider";
import { useAuth } from "@/app/hooks/useAuth";
import { supabase } from "@/app/supabaseClient";
import { Button, Image as ImageNUI } from "@nextui-org/react";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

export const SignupStepOne = ({
  fullName,
  setFullName,
  username,
  setUsername,
  setEmail,
  email,
  password,
  setPassword,
}: any) => {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    message: "",
  });
  const [processingSignUp, setProcessingSignUp] = useState<boolean>(false);
  // const searchParams = useSearchParams();
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const returnUrl = searchParams.get("returnUrl");

  const handleSignUpStep1 = async () => {
    // check if user already has an account with same email
    const { error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);
    // if yes, take them to login
    if (error) {
      //   navigate("/#login");
    } else {
      // sign up then continue to payment
      if (processingSignUp) return;
      auth.signup(
        { email, password, fullName, username } as SignUpParam,
        (error) => {
          // console.log('signupError', error);
          setErrorMsg({
            title: "Failed to register",
            message: error.message,
          });
        },
        setProcessingSignUp
      );
    }
  };

  return (
    <div className="">
      <Link href="/">
        <ImageNUI
          src="/logo-2.svg"
          alt="logo"
          width={200}
          height={40}
          className="h-auto"
        />
      </Link>

      <h5 className="font-bold font-PlusJakartaSansBold text-black/80 text-[18px] md:text-[25px] mt-4 mb-1 -ml-2">
        ⚡ Setup & Start 3-Day Trial
      </h5>

      <p className="mb-4 text-[17px]">
        Unlimited Questions, Unlimited Answers just £5 for 3 days!
      </p>

      {errorMsg?.message && (
        <div className="bg-red-300 py-3 px-4 rounded-lg mb-3 text-gray-900">
          <div className="font-bold">{errorMsg.title}</div>
          <div className="">{errorMsg.message}</div>
        </div>
      )}

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email || !password) return;
          if (password.length < 6) {
            setErrorMsg({
              title: "Alert",
              message: "Password must be at least 6 characters long.",
            });
            return;
          }
          email && password && handleSignUpStep1();
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <div className="flex flex-col w-full">
            <label
              htmlFor="full_name"
              className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px] mb-[8px]"
            >
              Full Name (First name first)
            </label>
            <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)] w-full">
              <input
                type="text"
                name="full_name"
                id="full_name"
                className="w-full py-3 outline-none border-none"
                placeholder="Enter your full name"
                required
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="full_name"
              className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px] mb-[8px]"
            >
              username
            </label>
            <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)] w-full">
              <input
                type="text"
                name="username"
                id="username"
                className="w-full py-3 outline-none border-none"
                placeholder="Choose a username"
                required
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px] mb-[8px]"
          >
            Email Address
          </label>
          <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)]">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full py-3 outline-none border-none"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={({ target }) => setEmail(target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px] mb-[8px]"
          >
            Password
          </label>
          <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)]">
            <input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              id="password"
              className="w-full py-3 outline-none border-none"
              placeholder="Enter your password"
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <div className="flex items-center justify-center h-[50px]">
              {showPassword && (
                <FaEyeSlash
                  color="#8094AE"
                  className={`${
                    showPassword
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none max-w-0 min-w-0 w-0 h-0"
                  } transition-all duration-300 min-w-[20px] h-auto cursor-pointer`}
                  width={25}
                  height={25}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
              {!showPassword && (
                <FaEye
                  color="#8094AE"
                  className={`${
                    !showPassword
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none max-w-0 min-w-0 w-0 h-0"
                  } transition-all duration-300 min-w-[20px] h-auto cursor-pointer`}
                  width={25}
                  height={25}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <Button
          aria-label="Submit signup form"
          type="submit"
          onClick={() => {}}
          className={`bg-primary w-full flex items-center gap-3 justify-center text-white`}
          isLoading={processingSignUp}
        >
          {processingSignUp ? `processing...` : `Continue`}
          <FaArrowRight />
        </Button>

        <p className="text-center text-[#8091A7] italic text-xs">
          I agree to Askusat’s{" "}
          <Link
            href="/terms-of-service"
            target="_blank"
            className="text-primary"
          >
            Terms of Service
          </Link>
        </p>
      </form>

      <div className=" min-w-[70%] my-4 border"></div>

      <div className="text-center">
        <p className="text-center text-[#8091A7] italic text-xs">
          Already have an account?{" "}
          <Link
            href={`${returnUrl ? `/#login?returnUrl=${returnUrl}` : `/#login`}`}
            className="text-primary"
          >
            Login
          </Link>
        </p>
        {/* <p className="text-[10px] italic">Billed £50/Month</p> */}
      </div>
    </div>
  );
};
