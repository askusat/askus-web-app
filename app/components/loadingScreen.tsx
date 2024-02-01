"use client";

import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Image } from "@nextui-org/react";

export default function LoadingScreen() {
  const { loading } = useAuth();
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-screen grid place-items-center bg-primary">
          <div className="animate-pulse">
            <Image
              src="/footer.svg"
              alt="logo"
              width={132}
              height={29}
              className=""
            />
          </div>
        </div>
      )}
    </>
  );
}
