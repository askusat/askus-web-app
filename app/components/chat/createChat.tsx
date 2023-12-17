import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { IoCreateOutline } from "react-icons/io5";

export default function CreateChat() {
  return (
    <Link href={"/chat"} className="fixed z-[999999] bottom-20 right-2">
      <Button className="bg-primary text-white w-[50px] h-[50px]" isIconOnly>
        <IoCreateOutline size={24} />
      </Button>
    </Link>
  );
}
