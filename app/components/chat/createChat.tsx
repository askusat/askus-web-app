"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuMessagesSquare } from "react-icons/lu";

export default function CreateChat() {
  const pathname = usePathname();
  const dontShowList = ["/chat", "/signup", "/login", "/payment"];

  if (dontShowList.includes(pathname)) {
    return <></>;
  }

  return (
    <Link href={"/chat"} className="fixed z-[999999] bottom-20 right-2">
      <Button className="bg-primary text-white w-[50px] h-[50px]" isIconOnly>
        <LuMessagesSquare size={24} />
      </Button>
    </Link>
  );
}
