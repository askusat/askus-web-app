"use client";

/* eslint-disable react/no-unescaped-entities */

import { useAuth } from "@/app/hooks/useAuth";
import { supabase } from "@/app/supabaseClient";
import { User } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";

export default function AuthSection() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [otp, setOtp] = useState<number | undefined>();

  const handleSendOTP = async () => {
    if (!agreeToTerms)
      return toast.warning("Please agree to the teams of service");
    setProcessing(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) {
      // toast.error(error.message);
    } else {
      toast(`an OTP code has been sent to your email: ${email}`);
      setCurrentStep(2);
    }
    setProcessing(false);
  };

  const resendOTP = async () => {
    setProcessing(true);
    const { error, data } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) {
      // toast.error(error.message);
    } else {
      console.log({data});

      toast(`Another OTP code has been sent to your email: ${email}`);
    }
    setProcessing(false);
  };

  const verifyOTP = async () => {
    if (otp!.toString().length < 6)
      return toast.warning("Invalid OTP. Please enter the correct code!");
    setProcessing(true);
    const { error, data } = await supabase.auth.verifyOtp({
      email,
      token: otp!.toString(),
      type: "email",
    });

    if (!error && data.user) {
      const authUser = data.user;
      const { data: userData, error: userDataError } = await supabase
        .from("users")
        .select("*")
        .eq("email", authUser.email)
        .single();

      if (userDataError || !userData) {
        // proceed to register
        const getFullNameFromEmail = (email: string) => {
          const [localPart] = email.split("@");
          const nameParts = localPart.split(".");
          const fullName = nameParts
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");

          return fullName;
        };

        const entryData: Partial<User> = {
          authUserId: authUser.id,
          email: authUser.email || "",
          fullName: getFullNameFromEmail(authUser.email!),
          username: getFullNameFromEmail(authUser.email!).replace(" ", "_"),
        };

        const { data: authUserDataM, error } = await supabase
          .from("users")
          .insert(entryData);
        if (error) {
          console.log("error creating user profile", error);
          toast.error(error.message);
          return;
        } else {
          const authUserData: User = authUserDataM as User;
          setUser(authUserData);
          window.localStorage.setItem("userData", JSON.stringify(authUserData));
          router.push("/chat");
        }

        // TODO: proceed to subscription
      } else {
        setUser(userData as User);
        window.localStorage.setItem("userData", JSON.stringify(userData));
        router.push("/chat");
        toast(`Login successful!`);
      }
      setCurrentStep(2);
    } else {
      toast.error(error?.message || "Something went wrong!");
    }
    setProcessing(false);
  };

  return (
    <div className="bg-white mb-[20px] md:mb-0 w-full md:max-w-[600px]  md:w-1/2  h-auto rounded-[20px]">
      <div className="flex justify-center flex-col px-[20px] pt-[22px] md:pt-[30px] lg:pt-[20px] xl:pt-[30px]">
        <h2 className="whitespace-nowrap text-[18px] lg:text-[22px] xl:text-[32px] font-[700] font-poppins">
          Setup & Start 3-Day Trial
        </h2>
        <p className="mt-[7px] md:mt-[10px] text-[14px] lg:text-[16px] font-poppins">
          Unlimited Questions, Unlimited Answers just £5 for 3 days!
        </p>
      </div>

      <form
        className="flex justify-center flex-col px-[20px] py-[10px] lg:py-[30px]"
        onSubmit={(e) => {
          e.preventDefault();
          if (currentStep === 1) {
            handleSendOTP();
          }
          if (currentStep === 2) {
            verifyOTP();
          }
        }}
      >
        {currentStep === 1 && (
          <div className="">
            <p className=" text-[14px] lg:text-[18px] font-poppins font-[400] ">
              Email
            </p>
            <input
              type="email"
              placeholder="Email"
              required
              className="py-1 px-2 md:px-3 md:py-2 outline-none w-full border rounded-[10px] border-[#16161633] h-[35px] md:h-[50px] lg:mt-[10px] shadow-lg shadow-[#0477FE26]"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="mt-[10px] lg:mt-[20px] xl:mt-[30px]">
            <p className="text-[14px] lg:text-[18px] font-poppins font-[400] ">
              OTP
            </p>
            <input
              type="number"
              placeholder="OTP-CODE"
              required
              className="py-1 px-2 md:px-3 md:py-2 outline-none w-full border rounded-[10px] border-[#16161633] h-[35px] md:h-[50px] lg:mt-[10px] shadow-lg shadow-[#0477FE26]"
              value={otp}
              onChange={(e) => {
                // log
                if (Number(e.target.value.length) <= 6) {
                  setOtp(Number(e.target.value));
                }
              }}
            />

            <div className="flex justify-end items-center gap-4">
              <div
                className="mt-1 md:mt-2 text-[#0477FE] font-poppins font-[400] text-[12px] lg:text-[16px] cursor-pointer"
                onClick={resendOTP}
              >
                Resend code
              </div>
              <div className="-mb-2">|</div>
              <div
                className="mt-1 md:mt-2 text-[#0477FE] font-poppins font-[400] text-[12px] lg:text-[16px] cursor-pointer"
                onClick={() => setCurrentStep(1)}
              >
                Wrong email?
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center mt-2 md:mt-4 gap-[8px]">
          <input
            type="checkbox"
            className=""
            checked={agreeToTerms}
            onChange={(e) => {
              setAgreeToTerms(e.target.checked);
            }}
          />
          <p className="text-[12px] lg:text-[16px] ">
            I agree to Askusat's{" "}
            <Link href="/terms-of-service" className="text-[#0477FE]">
              Terms of Service
            </Link>
          </p>
        </div>

        <div className="lg:py-[10px] lg:pt-[20px] py-[20px] md:pt-[31px] xl:py-[20px] xl:pt-[31px]">
          <button
            type="submit"
            className="lg:px-[60px] px-[49px] py-[8px] lg:py-[15px] md:px-[40px] md:py-[10px] xl:px-[82px] xl:py-[18px] bg-gradient-to-r text-[12px] lg:text-[20px] from-[#0477FE] to-[#0023FF] text-white rounded-[10px] flex items-center gap-3"
          >
            <span>{currentStep === 1 ? "Send OTP" : "Chat Now"}</span>
            {processing && <ImSpinner8 className="animate-spin" />}
          </button>
        </div>
      </form>
    </div>
  );
}
