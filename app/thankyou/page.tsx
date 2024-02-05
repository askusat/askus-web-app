"use client";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Thankyou() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.isSubscribed || (user.credit !== undefined && user.credit < 1)) {
      window.location.href = user?.isAdmin ? "/admin" : "/profile";
    }
  }, [user]);

  return <></>;
}
