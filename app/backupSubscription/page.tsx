"use client";

import {
  Appearance,
  loadStripe,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { STRIPE_Pk } from "../config";
import { useAuth } from "../hooks/useAuth";
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
  const { user, setShowPayment } = useAuth();
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
    <div
      className=" w-full  pt-20 pb-20 2xl:px-80 xl:px-40 md:px-20 sm:px-10  flex-grow relative bg-cover bg-no-repeat bg-top"
      style={{
        backgroundImage:
          "url(https://ww2.justanswer.co.uk/static/JA45108/background.jpg)",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col md:flex-row md:space-x-4 w-full">
        <div className="w-full lg:w-3/5 p-6 bg-white rounded-md">
          <h1 className="text-2xl font-bold leading-7 mt-7 text-gray-800">
            Join for £5 and get your answer in minutes
          </h1>
          <h2 className="text-base font-normal leading-5 text-gray-800 pt-2">
            Unlimited conversations with lawyers — try 3 days for just £5.
            Cancel anytime.
          </h2>

          <div className="pt-4">
            <div className="bg-blue-500 rounded-t-md flex items-center max-w-md p-2 relative">
              <div className="mr-3 relative w-12 h-12">
                <Image
                  src="/lawyer.jpg"
                  alt="Myles"
                  width={48}
                  height={48}
                  className="rounded-full"
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
                <div className="flex">
                  <div className="mr-1">
                    <b>36,767</b>
                  </div>
                  <div>Satisfied customers</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-100 border border-gray-300 rounded-b-md p-3 max-w-md text-sm leading-4">
              <div className="font-bold">
                {`Here's`} a quick recap of your conversation so far
              </div>
              <div className="mt-2">
                <ul className="list-disc pl-5">
                  <li>You have an issue with your landlord.</li>
                  <li>
                    You have already tried discussing the problem with them.
                  </li>
                  <li>The specific issue is repair-related.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <span>
                5 Lawyers are online now and ready to help with your
                question!
              </span>
            </div>
            <div className="bg-white  relative">
              <>
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
              </>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 ">
          <div className="w-full- max-w-sm- mx-auto-">
            <div className="bg-white/10 border border-gray-300 rounded-md p-4">
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

const StripeCont = ({
  user,
  clientSecret,
}: {
  user: User;
  clientSecret: string;
}) => {
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

    const returnUrl = window.location.href + `/payment/confirm-payment`;

    const { error } = await stripe.confirmSetup({
      elements,
      clientSecret,
      confirmParams: {
        return_url: returnUrl,
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
        className={`mt-4 md:mt-10 lg:px-[60px] px-[49px] py-[8px] lg:py-[15px] md:px-[40px] md:py-[10px] xl:px-[82px] xl:py-[18px] bg-gradient-to-r text-[12px] lg:text-[20px] from-[#0477FE] to-[#0023FF] text-white rounded-[10px] flex items-center gap-3 w-full justify-center ${
          processingPayment ? "cursor-wait" : "cursor-pointer"
        }`}
      >
        <span> {processingPayment ? `Processing...` : `Continue`} </span>
      </button>
      {processingPayment && (
        <div className="flex items-center justify-center gap-2 py-3">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <p className="font-[500] text-xs md:text-sm font-MontserratSemiBold text-[#757575] animate-pulse">
            {`We're processing your request, please wait...`}
          </p>
        </div>
      )}
    </form>
  );
};
