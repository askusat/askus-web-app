"use client";

import React, { useEffect, useState } from "react";
import AuthLayout from "../components/layout/authLayout";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Appearance,
  StripePaymentElementOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { PRICE_ID, STRIPE_Pk } from "../config";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../supabaseClient";
import { User } from "@/types";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { AuthUser } from "@supabase/supabase-js";
import { TbRotateRectangle } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";
import { sAlert } from "../utils/helpers";

const stripePromise = loadStripe(STRIPE_Pk || "");

export default function PaymentPage() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [progress, setProgress] = useState("30%");
  const [clientSecret, setClientSecret] = useState("");
  const [proccessingSetupIntent, setProccessingSetupIntent] = useState(false);

  useEffect(() => {
    setProgress("70%");
    const f = async () => {
      try {
        const aUserRes = await supabase.auth.getUser();
        setAuthUser(aUserRes.data.user || null);
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, []);

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
      console.log("authUser");
      console.log(authUser?.email);
      if (!authUser) return;

      setProccessingSetupIntent(true);
      console.log("start proccessing setupIntent...");
      let setupIntentRes = await axios
        .post(`/api/stripe`, {
          route: "create_intent",
          name: authUser?.user_metadata?.displayName,
          email: authUser?.email,
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
          await supabase.from("users").update(d).eq("email", authUser?.email);
        }
      }
    };
    fetch();
  }, [proccessingSetupIntent, authUser]);

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
    <AuthLayout>
      <div className="absolute top-0 left-0 w-full h-[8px]">
        <div
          id="progressbar"
          className={`bg-primary h-full transition-all duration-300`}
          style={{ width: progress }}
        ></div>
      </div>
      <div className="p-[20px] w-full">
        <div className={`md:px-[10%] lg:px-[15%] xl:px-[20%]`}>
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
            <div className="">
              <div className="skeleton-container">
                <div className="skeleton-item"></div>
                <div className="skeleton-item"></div>
                <div className="skeleton-item"></div>
              </div>
              <p className="text-center text-lg mt-3 animate-pulse">
                Loading...
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}

export interface StripeContProps {
  user: User;
  clientSecret: string;
}

const StripeCont = ({ user, clientSecret }: StripeContProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    message: "",
  });
  const [confirmingSetUpIntent, setConfirmingSetUpIntent] = useState(false);
  const [processingSubscription, setProcessingSubscription] = useState(false);
  const [selectedTab, setSelectedTab] = useState<any>("subscription");
  const credits = 15;
  const createAmountPerUnit = 50;
  const [creditUnit, setCreditUnit] = useState(1);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#credit") {
      setSelectedTab("credit");
    }

    return () => {
      setSelectedTab("subscription");
    };
  }, []);

  // confirm setup_intent_client_secret;
  useEffect(() => {
    const fetch = async () => {
      if (!stripe || confirmingSetUpIntent || !user) {
        return;
      }

      setConfirmingSetUpIntent(true);

      const clientSecret = new URLSearchParams(window.location.search).get(
        "setup_intent_client_secret"
      );

      if (!clientSecret) {
        return setConfirmingSetUpIntent(false);
      }

      // console.log("clientSecret");
      // console.log(clientSecret);

      // console.log("setup_intent_client_secret success!");
      const paymentIntent = await stripe.retrieveSetupIntent(clientSecret);
      switch (paymentIntent?.setupIntent?.status) {
        case "succeeded":
          console.log("subscription setup succeeded!");
          const payment_method = paymentIntent.setupIntent.payment_method;
          if (processingSubscription)
            return console.log("processing subscription already");
          setProcessingSubscription(true);
          var createSubscription = null;
          try {
            const creditAmount = new URLSearchParams(
              window.location.search
            ).get("credit");
            const hash = window.location.hash;
            const creditMode = hash.substring(1) === "credit";

            console.log("PRICE_ID");
            console.log(PRICE_ID);

            // create customer and subscription
            const createSubscriptionData = {
              route: "create_subscription",
              name: user?.fullName,
              email: user?.email,
              price: PRICE_ID,
              customer_id: user?.stripeCustomerId,
              payment_method, //attach_payment_method_to_customer
              creditMode,
              credit:
                (parseInt(creditAmount?.split("?")[0] || "15") / credits) *
                createAmountPerUnit,
            };

            createSubscription = await axios
              .post(`/api/stripe`, createSubscriptionData)
              .catch((error) => {
                return {
                  status: error.response.status,
                  data: error.response.data,
                };
              });

            if (createSubscription.status !== 200) {
              console.log(
                "faild to create subscription, Please contact support._"
              );
              sAlert(createSubscription.data.message);
              setConfirmingSetUpIntent(false);
              return;
            }
          } catch (error: any) {
            sAlert("faild to create subscription, Please contact support.");
            // alert(error?.message);
            sAlert(error.message);
            return setConfirmingSetUpIntent(false);
          }

          // console.log("createSubscription: ");
          // console.log(createSubscription);

          let d: any = {
            stripeSubscriptionId: createSubscription?.data?.subscription?.id,
            stripeCustomerId: createSubscription?.data?.customer_id,
            isSubscribed: true,
            subscription_status: createSubscription?.data?.subscription?.status,
          };
          if (createSubscription.data?.creditMode) {
            delete d.stripeSubscriptionId;
            delete d.isSubscribed;
            d = {
              ...d,
              credit:
                (createSubscription.data?.credit / createAmountPerUnit) *
                credits,
              creditExpiresOn: new Date(),
            };
          }

          // console.log("updateUser data: ");
          // console.log(d);

          await supabase.from("users").update(d).eq("id", user?.id);

          const progressbarEl: any = document.querySelector("#progressbar");
          if (progressbarEl) {
            progressbarEl.style.width = "100%";
          }

          window.location.href = user?.isAdmin ? "/admin" : "/profile";

          setConfirmingSetUpIntent(false);
          break;
        case "processing":
          console.log("Your payment is processing.");
          break;
        case "requires_payment_method":
          console.log("Your payment was not successful, please try again.");
          break;
        default:
          console.log("Something went wrong.");
          break;
      }
    };
    if (!user) return;
    fetch();
  }, [confirmingSetUpIntent, processingSubscription, router, stripe, user]);

  const handleSubmit = async () => {
    if (processingPayment) {
      setErrorMsg({
        title: "processing...",
        message: "Please wait",
      });
      return;
    }

    if (selectedTab !== "subscription" && creditUnit < 1) {
      setErrorMsg({
        title: "Invalid",
        message: "Credit must be at least 1",
      });
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

    const returnUrl = window.location.href;

    const { error } = await stripe.confirmSetup({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${returnUrl}?credit=${
          credits * creditUnit
        }#${selectedTab}`,
      },
    });

    if (error) {
      setErrorMsg({
        title: "Failed",
        message: error?.type + ": " + error?.message,
      });
    }

    setProcessingPayment(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  if (confirmingSetUpIntent) {
    return (
      <div className="">
        <div className="skeleton-container">
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
        </div>
        <p className="text-center text-lg mt-3 animate-pulse">
          Please be patient while we processes your subscription...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {errorMsg?.message && (
        <div className="bg-red-300 py-3 px-4 rounded-lg text-gray-900 mb-6">
          <div className="font-bold">{errorMsg.title}</div>
          <div className="">{errorMsg.message}</div>
        </div>
      )}

      <div className="flex w-full flex-col items-center">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="bordered"
          onSelectionChange={setSelectedTab}
          selectedKey={selectedTab}
        >
          <Tab
            key="subscription"
            title={
              <div className="flex items-center space-x-2">
                <TbRotateRectangle />
                <span>Subscription</span>
              </div>
            }
          />
          <Tab
            key="credit"
            title={
              <div className="flex items-center space-x-2">
                <BsCashCoin />
                <span>Credit</span>
              </div>
            }
          />
        </Tabs>
      </div>

      <div
        className={`mb-4 mt-2 ${
          selectedTab === "subscription" ? "h-[40px]" : "h-[80px]"
        } transition-all duration-700`}
      >
        <p className="text-xs text-center md:max-w-[320px] mx-auto border">
          {selectedTab === "subscription" ? (
            "Join for £5"
          ) : (
            <span>
              Purchase question credit 15 credits/unit for{" "}
              <b>£{createAmountPerUnit * creditUnit}</b> (unused credit expires
              after 30 days)
            </span>
          )}
        </p>

        <div
          className={`${
            selectedTab === "subscription" &&
            "h-0 w-0 pointer-events-none opacity-0"
          } transition-all duration-300 flex items-center gap-3 justify-center border shadow-lg w-fit mx-auto rounded-lg py-1 px-3`}
        >
          <span className="w-auto h-8 rounded-md grid place-items-center border bg-primary text-white px-2">
            {credits * creditUnit}
          </span>
          <input
            type="number"
            inputMode="numeric"
            value={creditUnit}
            onChange={(e: any) => {
              setCreditUnit(e.target.value);
            }}
            min={1}
            className="w-12 rounded-md text-center border outline-none"
          />
        </div>
      </div>

      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <div className="mt-4">
        <Button
          aria-label="continue or proceesing"
          className={`${
            processingPayment ? "cursor-wait" : "cursor-pointer"
          } bg-primary text-white font-MontserratSemiBold text-[.8rem] xl:text-[1.125rem] "mt-5" w-full py-4 rounded-[10px] font-[600] mb-4`}
          type="submit"
        >
          <span> {processingPayment ? `Processing...` : `Continue`} </span>
        </Button>
        {processingPayment && (
          <div className="flex items-center justify-center gap-2 py-3">
            <AiOutlineLoading3Quarters className="animate-spin" />
            <p className="font-[500] text-xs md:text-sm font-MontserratSemiBold text-[#757575] animate-pulse">
              {`We're processing your request, please wait...`}
            </p>
          </div>
        )}
      </div>
    </form>
  );
};
