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
import { supabase } from "@/app/supabaseClient";

const stripePromise = loadStripe(STRIPE_Pk || "");

// Define User interface if you haven't already
interface User {
  id: string;
  fullName: string;
  email: string;
  stripeCustomerId: string;
}

interface ThankyouPageProps {
  user: User; // Use the User interface here
}

export default function ThankyouPage({ user }: ThankyouPageProps) {
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
          <ThankyouComp clientSecret={clientSecret} user={user} />
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

function ThankyouComp({
  clientSecret,
  user,
}: {
  clientSecret: string;
  user: User;
}) {
  const stripe = useStripe();
  const router = useRouter();

  const [confirmingSetUpIntent, setConfirmingSetUpIntent] = useState(false);
  const [processingSubscription, setProcessingSubscription] = useState(false);

  // confirm setup_intent_client_secret
  useEffect(() => {
    const fetch = async () => {
      if (!stripe || confirmingSetUpIntent || !user) {
        return;
      }

      setConfirmingSetUpIntent(true);

      if (!clientSecret) {
        return setConfirmingSetUpIntent(false);
      }

      const paymentIntent = await stripe.retrieveSetupIntent(clientSecret);
      switch (paymentIntent?.setupIntent?.status) {
        case "succeeded":
          console.log("subscription setup succeeded!");
          const payment_method = paymentIntent.setupIntent.payment_method;
          if (processingSubscription)
            return console.log("processing subscription already");
          setProcessingSubscription(true);
          let createSubscription = null;
          try {
            const creditAmount = new URLSearchParams(
              window.location.search
            ).get("credit");
            const hash = window.location.hash;
            const creditMode = hash.substring(1) === "credit";

            // Create customer and subscription
            const createSubscriptionData = {
              route: "create_subscription",
              name: user.fullName, // Use user information directly
              email: user.email, // Use user information directly
              price: PRICE_ID,
              customer_id: user.stripeCustomerId, // Use user information directly
              payment_method, // Attach payment method to customer
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
                "failed to create subscription, Please contact support."
              );
              toast.error(createSubscription.data.message);
              setConfirmingSetUpIntent(false);
              setTimeout(() => {
                window.location.href = `/payment`;
              }, 2000);
              return;
            }
          } catch (error: any) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "An unexpected error occurred.";
            toast.error(errorMessage);
            return setConfirmingSetUpIntent(false);
          }

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

          await supabase.from("users").update(d).eq("id", user.id); // Use user information directly

          const progressbarEl: HTMLElement | null =
            document.querySelector("#progressbar");
          if (progressbarEl) {
            progressbarEl.style.width = "100%";
          }

          router.push(`/thankyou`);
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
      <div>
        <div className="skeleton-container min-w-[300px]">
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
        </div>
        <p className="text-center text-lg mt-3 animate-pulse">
          Verification in progress...
        </p>
      </div>
    </div>
  );
}
