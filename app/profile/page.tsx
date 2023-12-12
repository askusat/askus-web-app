"use client";

import React from "react";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/loadingScreen";
import Layout from "../components/layout";

export default function ProfilePage() {
  const auth = useAuth();
  return (
    <>
      <LoadingScreen />
      <Layout />
      <div className="py-8 px-12">ProfilePage for {auth.user?.email}</div>

      <div className="mb-32"></div>
    </>
  );
}
