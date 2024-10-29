"use client";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { PRICE_ID, STRIPE_Pk } from "@/app/config";
import { useAuth } from "@/app/hooks/useAuth";
import { supabase } from "@/app/supabaseClient";

const stripePromise = loadStripe(STRIPE_Pk || "");

export default function ThankyouPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "setup_intent_client_secret"
    );
    setClientSecret(clientSecret!);
  }, []);

  const appearance: Appearance = {
    theme: "flat",
    variables: {
      colorPrimaryText: "#fff",
      colorPrimary: "#EF5F3C",
    },
  };

  return (
    <div className="min-h-screen">
      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance,
          }}
        >
          <ThankyouComp clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div className="grid place-items-center">
          <div className="skeleton-container">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
          <p className="text-center text-lg mt-3 animate-pulse">Loading...</p>
        </div>
      )}
    </div>
  );
}

function ThankyouComp({ clientSecret }: { clientSecret: string }) {
  const { user } = useAuth();
  const stripe = useStripe();
  const router = useRouter();

  const [confirmingSetUpIntent, setConfirmingSetUpIntent] = useState(false);
  const [processingSubscription, setProcessingSubscription] = useState(false);

  // confirm setup_intent_client_secret;
  useEffect(() => {
    const fetch = async () => {
      if (!stripe || confirmingSetUpIntent || !user) {
        return;
      }

      setConfirmingSetUpIntent(true);

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

            // console.log("PRICE_ID");
            // console.log(PRICE_ID);

            // create customer and subscription
            const createSubscriptionData = {
              route: "create_subscription",
              name: user?.fullName,
              email: user?.email,
              price: PRICE_ID,
              customer_id: user?.stripeCustomerId,
              payment_method, //attach_payment_method_to_customer
              creditMode,
              credit: 0,
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
              toast.error(createSubscription.data.message);
              setConfirmingSetUpIntent(false);
              setTimeout(() => {
                window.location.href = `/payment`;
              }, 2000);
              return;
            }
          } catch (error: any) {
            toast.error(
              "faild to create subscription, Please contact support."
            );
            // alert(error?.message);
            toast.error(error.message);
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
              credit: 0,
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

          // window.location.href = user?.isAdmin ? "/admin" : "/profile";
          // window.location.href = "/thankyou";
          router.push(`/thankyou`);
          // toast("success! go to /thankyou");

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
  }, [
    confirmingSetUpIntent,
    processingSubscription,
    router,
    stripe,
    user,
    clientSecret,
  ]);

  return (
    <div className="max-w-[300px] mx-auto h-screen grid place-items-center">
      <div className="">
        <div className="skeleton-container min-w-[300px]">
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
        </div>
        <p className="text-center text-lg mt-3 animate-pulse">
          Verification in progress. This might take a minute...
        </p>
      </div>
    </div>
  );
}
