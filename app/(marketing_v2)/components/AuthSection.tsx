"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { supabase } from "@/app/supabaseClient";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";

export default function AuthSection({
  glow,
  setGlow,
}: {
  glow: boolean;
  setGlow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const loginRef = useRef<HTMLDivElement | null>(null);

  // handleIntersection
  useEffect(() => {
    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && loginRef.current) {
          setGlow(true);
          setTimeout(() => {
            if (loginRef.current) {
              setGlow(false);
            }
          }, 1000);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1.0,
    });

    if (loginRef.current) {
      observer.observe(loginRef.current);
    }

    // Cleanup observer on component unmount
    const cur = loginRef.current;
    return () => {
      if (cur) {
        observer.unobserve(cur);
      }
    };
  }, [setGlow]);

  const handleProceed = () => {
    if (!user && !agreeToTerms) {
      toast.warning("Please agree to the terms of service");
      return;
    }

    // if (!user) {
    //   toast.warning("Please log in to proceed");
    //   return;
    // }

    router.push(user ? "/chat" : "/Subscription");
  };

  return (
    <div
      id="login"
      ref={loginRef}
      className="bg-white mb-[20px] md:mb-0 w-full md:max-w-[600px]  md:w-1/2  h-auto rounded-[20px]"
    >
      <div className="flex justify-center flex-col px-[20px] pt-[22px] md:pt-[30px] lg:pt-[20px] xl:pt-[30px]">
        <h2 className="whitespace-nowrap text-[18px] lg:text-[22px] xl:text-[32px] font-[700] font-poppins">
          Talk to a Solicitor
        </h2>
        <p className="mt-[7px] md:mt-[10px] text-[14px] lg:text-[16px] font-poppins">
          Unlimited Questions, Unlimited Answers just £5 for 3 days!
        </p>
      </div>

      <div className="flex justify-center flex-col px-[20px] pb-[10px] lg:pb-[30px]">
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
            {`I agree to Askusat's`}{" "}
            <a href="/terms-of-service" className="text-[#0477FE]">
              Terms of Service
            </a>
          </p>
        </div>

        <div className="lg:py-[10px] lg:pt-[20px] py-[20px] md:pt-[31px] xl:py-[20px] xl:pt-[31px]">
          <button
            type="button"
            className="lg:px-[60px] px-[49px] py-[8px] lg:py-[15px] md:px-[40px] md:py-[10px] xl:px-[82px] xl:py-[18px] bg-gradient-to-r text-[12px] lg:text-[20px] from-[#0477FE] to-[#0023FF] text-white rounded-[10px] flex items-center gap-3"
            onClick={handleProceed}
            disabled={processing}
          >
            <span> Ask your question</span>
            {processing && <ImSpinner8 className="animate-spin" />}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row  max-h-18 w-full">
          <div className="flex items-center mb-4 sm:mb-0 sm:mr-6 w-full sm:w-auto">
            <span className="rounded-full text-[14px] leading-[22px] border border-black text-black w-6 h-6 mr-2 font-bold tracking-wide text-center">
              1
            </span>
            <div className="text-[12px] leading-[16px] text-black">
              Ask your question
            </div>
          </div>
          <div className="flex items-center mb-4 sm:mb-0 sm:mr-6 w-full sm:w-auto">
            <span className="rounded-full text-[14px] leading-[22px] border border-black text-black w-6 h-6 mr-2 font-bold tracking-wide text-center">
              2
            </span>
            <div className="text-[12px] leading-[16px] text-black">
              Connect with a Solicitor
            </div>
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <span className="rounded-full text-[14px] leading-[22px] border border-black text-black w-6 h-6 mr-2 font-bold tracking-wide text-center">
              3
            </span>
            <div className="text-[12px] leading-[16px] text-black">
              Talk 1-on-1 online
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
