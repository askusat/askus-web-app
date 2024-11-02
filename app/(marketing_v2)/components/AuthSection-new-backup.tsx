"use client";

import { STRIPE_Pk } from "@/app/config";
/* eslint-disable react/no-unescaped-entities */

import { useAuth } from "@/app/hooks/useAuth";
// import useHash from "@/app/hooks/useHash";
import { supabase } from "@/app/supabaseClient";
import { User } from "@/types";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";

const stripePromise = loadStripe(STRIPE_Pk!);

export default function AuthSection({
  glow,
  setGlow,
}: {
  glow: boolean;
  setGlow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setUser, setShowPayment } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [otp, setOtp] = useState<number | undefined>();
  // const [showPayment, ] = useState(false);

  const loginRef = useRef<HTMLDivElement | null>(null);

  // handleIntersection
  useEffect(() => {
    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && loginRef.current) {
          setGlow(true);
          // loginRef.current.classList.add("animate-login-glow");
          setTimeout(() => {
            if (loginRef.current) {
              setGlow(false);
              // loginRef.current.classList.remove("animate-login-glow");
            }
          }, 1000);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1.0, // Adjust as needed
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

  // animation
  useEffect(() => {
    if (glow && loginRef.current) {
      loginRef.current.classList.add("animate-login-glow");
      setTimeout(() => {
        if (loginRef.current) {
          loginRef.current.classList.remove("animate-login-glow");
        }
      }, 1000);
    }
  }, [glow]);

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
      console.log({ data });

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
          router.push("/payment");
          setShowPayment(true);
        }
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
    <div
      id="login"
      ref={loginRef}
      className="bg-white mb-[20px] md:mb-0 w-full md:max-w-[600px]  md:w-1/2  h-auto rounded-[20px]"
    >
      {/* <PaymentForm setShowPayment={setShowPayment} /> */}

      <div className="flex justify-center flex-col px-[20px] pt-[22px] md:pt-[30px] lg:pt-[20px] xl:pt-[30px]">
        <h2 className="whitespace-nowrap text-[18px] lg:text-[22px] xl:text-[32px] font-[700] font-poppins">
          Talk to a Lawyer
        </h2>
        <p className="mt-[7px] md:mt-[10px] text-[14px] lg:text-[16px] font-poppins">
          Unlimited Questions, Unlimited Answers just £5 for 3 days!
        </p>
      </div>

      <form
        className="flex justify-center flex-col px-[20px]  lg:pb-[10px] "
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

        <div className="lg:pt-[10px] lg:pt-[20px] pt-[20px] md:pt-[31px] xl:pt-[20px] xl:pt-[31px]">
          <button
            type="submit"
            className="w-full md:w-auto z-10 lg:px-[27px] py-[18px] bg-gradient-to-r text-[15px] lg:text-[20px] from-[#0477FE] to-[#0023FF] text-white rounded-[10px]"
          >
            Ask your question
          </button>
        </div>
        <div className="flex flex-col sm:flex-row py-6 max-h-18 w-full">
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
              Connect with a Lawyer
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
      </form>
    </div>
  );
}

const PaymentForm = ({
  setShowPayment,
}: {
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [proccessingSetupIntent, setProccessingSetupIntent] = useState(false);

  // Create SetupIntent as soon as the page loads
  useEffect(() => {
    const setupIntentclientSecret = new URLSearchParams(
      window.location.search
    ).get("setup_intent_client_secret");

    if (setupIntentclientSecret) console.log("Confirming payment...");

    if (proccessingSetupIntent) {
      return console.log("already setting up setupIntent...");
    }

    const fetch = async () => {
      if (!user) {
        toast.warning("You need to login first!");
        setShowPayment(false);
        return;
      }

      setProccessingSetupIntent(true);
      console.log("start proccessing setupIntent...");
      let setupIntentRes = await axios
        .post(`/api/stripe`, {
          route: "create_intent",
          name: user.fullName,
          email: user?.email,
        })
        .then((response: any) => response.data)
        .catch((err: any) => {
          console.log(err);
        });

      if (setupIntentRes?.clientSecret) {
        var clientSecret = setupIntentRes.clientSecret;
        var customer = setupIntentRes?.customer;
        setClientSecret(clientSecret);
        if (customer) {
          const d = {
            stripeCustomerId: customer.id,
          };
          await supabase.from("users").update(d).eq("email", user?.email);
        }
      }
    };
    fetch();
  }, [proccessingSetupIntent, setShowPayment, user]);

  const appearance: Appearance = {
    // theme: 'stripe',
    theme: "flat",
    variables: {
      colorPrimaryText: "#fff",
      colorPrimary: "#EF5F3C",
      // fontFamily: 'Ideal Sans, system-ui, sans-serif',
      // colorBackground: '#ffffff',
    },
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen">
      <div className="absolute top-0 left-0 w-full h-screen bg-black/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <form className="bg-white px-16 py-[45px] rounded-[20px]">
          <div className="text-center text-[42px] font-bold text-[#0477FE] leading-[63px]">
            Subscription
          </div>
          <div className="text-center text-[#161616] text-xl">Join for £5</div>

          <div className="mt-4">
            {clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance,
                }}
              >
                <StripeCont user={user} clientSecret={clientSecret} />
              </Elements>
            ) : (
              <>
                <div className="skeleton-container">
                  <div className="skeleton-item"></div>
                  <div className="skeleton-item"></div>
                  <div className="skeleton-item"></div>
                </div>
                <p className="text-center text-lg mt-3 animate-pulse">
                  Loading...
                </p>
              </>
            )}
          </div>

          <p className="text-base leading-[30px] mt-2">
            By providing your card information, you allow ASKUS ANYTIME LIMITED
            to charge your card for future payments in accordance with their
            terms.
          </p>
          <button
            type="submit"
            className="mt-10 lg:px-[60px] px-[49px] py-[8px] lg:py-[15px] md:px-[40px] md:py-[10px] xl:px-[82px] xl:py-[18px] bg-gradient-to-r text-[12px] lg:text-[20px] from-[#0477FE] to-[#0023FF] text-white rounded-[10px] flex items-center gap-3 w-full justify-center"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

const StripeCont = ({
  user,
  clientSecret,
}: {
  user: User;
  clientSecret: string;
}) => {
  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <PaymentElement id="payment-element" options={paymentElementOptions} />
  );
};
