"use client";

import { Button, Image, Textarea } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import ChatBotAnimText from "./home/ChatBotAnimText";
import { useRouter } from "next/navigation";

export default function ChatBot() {
  const router = useRouter()
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex h-full items-center justify-end">
      <div className="w-full max-w-[440px] h-[470px] rounded-[26px] bg-white shadow-[0px_0px_17.7px_3px_rgba(0,_0,_0,_0.09)] relative overflow-hidden">
        <div className="rounded-t-[26px] bg-primary text-white min-h-[120px] w-full">
          <div className="py-4 px-7 flex gap-3">
            <Image src={"/juris.svg"} alt="" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold">Juris</h2>
                <p className="">- Consultant</p>
              </div>
              <p className="text-sm font-bold">184 Satisfied Customer</p>
              <p className="text-sm">
                25 years of experience helping people just like you
              </p>
            </div>
          </div>
        </div>

        <textarea
          ref={inputRef}
          className={`${
            !showInput && "pointer-events-none !h-0 opacity-0"
          } transition-all duration-300 outline-none border-none resize-none w-full h-full max-h-[50%] overflow-auto px-7 pt-4`}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={() => {
            if (!inputValue) {
              setShowInput(false);
            }
          }}
        />

        {!showInput && (
          <div
            className="px-7 animate-pulse"
            onClick={() => {
              setShowInput(true);
              // inputRef && inputRef.current && (inputRef.current as HTMLTextAreaElement).focus();
              inputRef &&
                inputRef.current &&
                (inputRef.current as HTMLTextAreaElement).focus();
            }}
          >
            {/* Ask your question here... */}
            <ChatBotAnimText delay={1} />
          </div>
        )}

        <Button
        aria-label="Start Conversation"
          className="mt-3 bg-primary text-white rounded-[10px] w-[calc(100%-56px)] mx-7 absolute bottom-6 left-0"
          size="lg"
          onClick={() =>  {
            router.push(`/chat?message=${inputRef.current ? inputRef.current.value : ''}`)
          }}
        >
          Start Conservation
        </Button>
      </div>
    </div>
  );
}
