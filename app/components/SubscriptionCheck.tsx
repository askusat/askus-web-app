"use client";

import React from "react";
// import SubscriptionModal from "./modal/subscriptionModal";
import { useAuth } from "../hooks/useAuth";
import SubscriptionPage from "../Subscription/page";
export default function SubscriptionCheck() {
  const { showPayment } = useAuth();

  // return <div>{showPayment && <SubscriptionModal />}</div>;
  return <div>{showPayment && <SubscriptionPage />}</div>;
}
