"use client";

import { STRIPE_Pk } from "@/app/config";
import { useAuth } from "@/app/hooks/useAuth";
import { supabase } from "@/app/supabaseClient";
import { User } from "@/types";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const stripePromise = loadStripe(STRIPE_Pk!);

export default function SubscriptionModal() {
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
    <div className="fixed z-[9999999] top-0 left-0 w-full h-screen">
      <div
        className="absolute top-0 left-0 w-full h-screen bg-black/50 cursor-pointer"
        onClick={() => setShowPayment(false)}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[90%] mx-auto md:min-w-[650px]">
        <div className="bg-white p-4 md:px-16 md:py-[45px] rounded-[20px] relative">
          <div
            className="absolute top-2 right-2 ring-2 cursor-pointer"
            onClick={() => setShowPayment(false)}
          >
            <FaTimes className="text-red-600" size={20} />
          </div>
          <div className="text-center text-2xl md:text-[42px] font-bold text-[#0477FE] md:leading-[63px]">
            Subscription
          </div>
          <div className="text-center text-[#161616] text-xs md:text-lg">
            Join for £5
          </div>

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

    const returnUrl = window.location.origin + `/payment/confirm-payment`;

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
