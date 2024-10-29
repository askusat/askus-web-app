"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuMessagesSquare } from "react-icons/lu";

export default function CreateChat() {
  const pathname = usePathname();
  const dontShowList = [
    "/",
    "/chat",
    "/chatv2",
    "/signup",
    "/login",
    "/Subscription",
    "/payment",
    "/askusnow",
  ];

  if (dontShowList.includes(pathname)) {
    return <></>;
  }

  return (
    <Link href={"/chat"} className="fixed z-[999999] bottom-20 right-2">
      <Button
        aria-label="Get started button"
        className="bg-primary text-white w-[50px] h-[50px]"
        isIconOnly
      >
        <LuMessagesSquare size={24} />
      </Button>
    </Link>
  );
}
