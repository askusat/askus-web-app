"use client";

import React from "react";
import SubscriptionModal from "./modal/subscriptionModal";
import { useAuth } from "../hooks/useAuth";

export default function SubscriptionCheck() {
  const { showPayment } = useAuth();

  return <div>{showPayment && <SubscriptionModal />}</div>;
}
