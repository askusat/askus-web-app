"use client";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Thankyou() {
  return (
    <div className="">
      <div
        className="h-screen w-full fixed top-0 left-0 z-10 bg-center bg-cover bg-no-repeat bg-blue-100"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(0, 112, 240, 0.75), rgba(0, 112, 240, 0.6), rgba(0, 112, 240, 0.45), rgba(0, 112, 240, 0.3), rgba(0, 112, 240, 0.15)), url(team2.jpg)",
        }}
      >
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 grid place-items-center">
          <div className="py-10 px-14 rounded-lg bg-white flex flex-col gap-5 items-center max-w-[500px]">
            <h1 className="text-6xl font-bold uppercase">Thank you!</h1>
            <div className="">
              <FaCheck size={60} color="green" />
            </div>
            <p className="text-center">
              You have successful signed up with us. Click the link below to
              start getting answers to your questions.
            </p>

            <Link href={"/chat"}>
              <Button
                aria-label="Get started button"
                className=" text-white mt-10 mb-10 bg-primary rounded-[10px]"
                size="lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
