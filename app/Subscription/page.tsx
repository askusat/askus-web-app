"use client";

import {
  Appearance,
  loadStripe,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { STRIPE_Pk } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";
import { FaTimes } from "react-icons/fa";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { User } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";

const stripePromise = loadStripe(STRIPE_Pk!);

export default function SubscriptionPage() {
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
      setProccessingSetupIntent(true);
      console.log("start proccessing setupIntent...");

      // Assuming you have user details passed or retrieved elsewhere
      const user = {
        fullName: "John Doe", // Replace with actual user's name
        email: "johndoe@example.com", // Replace with actual user's email
      };

      let setupIntentRes = await axios
        .post(`/api/stripe`, {
          route: "create_intent",
          name: user.fullName,
          email: user.email,
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
  }, [proccessingSetupIntent]);

  const appearance: Appearance = {
    theme: "flat",
    variables: {
      colorPrimaryText: "#fff",
      colorPrimary: "#EF5F3C",
    },
  };

  return (
    <div
      className=" w-full  pt-20 pb-20 2xl:px-60 xl:px-40 md:px-20 sm:px-10  flex-grow relative bg-cover bg-no-repeat bg-top"
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(0, 112, 240, 0.75), rgba(0, 112, 240, 0.6), rgba(0, 112, 240, 0.45), rgba(0, 112, 240, 0.3), rgba(0, 112, 240, 0.15)), url(team2.jpg)",
      }}
    >
      <div className="flex flex-col md:flex-row md:space-x-4 w-full">
        <div className="w-full lg:w-3/5 p-6 bg-white rounded-md">
          <h1 className="text-2xl font-bold leading-7 mt-7 text-gray-800">
            Join for £5 and get your answer in minutes
          </h1>
          <h2 className="text-base font-normal leading-5 text-gray-800 pt-2">
            Unlimited conversations with solicitors — try 3 days for just £5.
            Then £50/month. Cancel anytime.
          </h2>

          <div className="pt-4">
            <div className="bg-blue-500 rounded-t-md flex items-center max-w-3lx p-2 relative">
              <div className="mr-3 relative w-12 h-12">
                <Image
                  src="/Myles.jpeg"
                  alt=""
                  width={45}
                  height={45}
                  className="object-cover w-[45px] h-[45px] md:w-[45px] md:h-[45px] object-center object-cover rounded-full"
                />
                <span className="absolute top-0 right-0">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_1052:4366)">
                      <path
                        d="M8.93333 1L2 3.90909V8.27273C2 12.3127 4.95437 16.08 8.93333 17C12.9123 16.08 15.8667 12.3127 15.8667 8.27273V3.90909L8.93333 1Z"
                        fill="#00BF8F"
                      />
                    </g>
                    <path
                      d="M8.0444 12.7334L5.19995 10.0143L6.20617 9.05244L8.0444 10.8096L12.7271 6.33337L13.7333 7.29524L8.0444 12.7334Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-white flex flex-col text-sm leading-4">
                <div className="mb-1">
                  <b>Myles,</b> <span>Lawyer</span>
                </div>
                {/* <div className="flex">
                  <div className="mr-1">
                    <b>36,767</b>
                  </div>
                  <div>Satisfied customers</div>
                </div> */}
              </div>
            </div>

            <div className="bg-blue-100 border border-gray-300 rounded-b-md p-3 max-w-3lx text-sm leading-4">
              <div className="font-bold">{`Here's`} what will happen next:</div>
              <div className="mt-2">
                <ul className="list-disc pl-5">
                  <li>
                    Gain immediate access to our chat system and a qualified UK
                    lawyer.
                  </li>
                  <li>
                    We will provide clear, actionable advice tailored to your
                    situation.
                  </li>
                  <li>
                    You will understand your rights and the best possible
                    outcomes for your case.
                  </li>
                  <li>
                    You can ask as many questions as you like to ensure
                    complete clarity.
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <span>
                5 Solicitors are online now and ready to help with your
                question!
              </span>
            </div>
            <div className="bg-white relative">
              <>
                {clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance,
                    }}
                  >
                    <StripeCont clientSecret={clientSecret} />
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
              </>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 ">
          <div className="w-full- max-w-sm- mx-auto-">
            <div className="bg-white/30 border border-gray-300 rounded-md p-4">
              <h5 className="text-sm font-bold tracking-wide leading-5 mb-3 text-white">
                What our customers say
              </h5>
              <div className="border-t border-gray-300/50 pt-4">
                <div className="mb-4">
                  <div className="text-xs font-bold leading-4 mb-1 text-white">
                    Emily T., Birmingham
                  </div>
                  <p className="text-sm leading-5 text-white">
                    After spending a substantial amount on consultations with
                    lawyers without finding a satisfactory solution on a
                    business dispute, a friend recommended Askus Anytime. One of
                    the experts there responded to my query within seconds and
                    provided me with the legal guidance that ultimately helped
                    me. Thanks, Askus Anytime!
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-300/50 pt-4">
                <div className="mb-4">
                  <div className="text-xs font-bold leading-4 mb-1 text-white">
                    Ahmed K., Manchester
                  </div>
                  <p className="text-sm leading-5 text-white">
                    UK immigration lawyers of Askus Anytime were instrumental in
                    helping me secure my visa. They guided me through the entire
                    process and made it seamless. Thank you!
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-300/50 pt-4">
                <div className="mb-4">
                  <div className="text-xs font-bold leading-4 mb-1 text-white">
                    John S., Jordan
                  </div>
                  <p className="text-sm leading-5 text-white">
                    Askus Anytime provided excellent legal assistance for
                    divorce. They expertly navigated custody issues with
                    empathy, providing crucial support during a challenging
                    time. Their dedication to ensuring the well-being of my
                    family was evident throughout the process, and I highly
                    recommend their legal service for divorce.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StripeCont = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleSubmit = async () => {
    if (processingPayment) {
      toast.warning("Please wait");
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log("submitError:", submitError);
      alert(submitError.type + ": " + submitError.message);
      return;
    }

    setProcessingPayment(true);

    // const returnUrl = window.location.href + `/payment/confirm-payment`;
    // return_url: `${window.location.origin}/thankyou`,
    const { error } = await stripe.confirmSetup({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/#login`,
      },
    });

    if (error) {
      toast.error(error?.type + ": " + error?.message);
    }

    setProcessingPayment(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="mt-6 max-h-[700px] md:max-h-[300px] overflow-y-auto overflow-x-hidden px-2">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>

      <button
        type={processingPayment ? "button" : "submit"}
        className={`mt-4 md:mt-10 lg:px-[60px] px-[49px] font-bold py-3 flex w-full items-center justify-center md:w-auto space-x-2 ${
          processingPayment
            ? "bg-gray-200 text-gray-400"
            : "bg-orange-500 text-white hover:bg-orange-400 transition-colors"
        }`}
      >
        {processingPayment ? (
          <>
            <AiOutlineLoading3Quarters className="inline-block animate-spin text-xl" />
            Processing...
          </>
        ) : (
          <>Start Membership - £5</>
        )}
      </button>
    </form>
  );
};
