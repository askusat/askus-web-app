// 'use client'

import { Avatar, AvatarGroup, Button, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const conversations = [
  "kj",
  "sdsd",
  "ssdsf",
  "kj",
  "sdsd",
  "ssdsf",
  "kj",
  "sdsd",
  "ssdsf",
  "kj",
  "sdsd",
  "ssdsf",
];
export default function ChatPage() {
  return (
    <div className="h-screen w-full">
      <nav className="fixed top-0 left-0 w-full h-[50px] bg-primary text-white">
        <div className="flex items-center justify-between h-full px-2">
          <div className="flex items-center h-full">
            <Button isIconOnly size="sm" className="bg-transparent">
              <div className="w-4 h-4 rounded-full bg-danger text-white grid place-items-center text-xs"></div>
            </Button>
            <Button isIconOnly size="sm" className="bg-transparent">
              <div className="w-4 h-4 rounded-full bg-warning text-white grid place-items-center text-xs"></div>
            </Button>
            <Button isIconOnly size="sm" className="bg-transparent">
              <div className="w-4 h-4 rounded-full bg-success text-white grid place-items-center text-xs"></div>
            </Button>
          </div>
          <Link href={'/'}>
            <Image
              src="/footer.svg"
              alt=""
              width={132}
              height={29}
              className="w-auto h-[35px] mr-2"
            />
          </Link>
        </div>
      </nav>

      <main className="mt-[50px] mb-[50px] py-2 pb-8">
        {conversations.length > 0 ? (
          <div className="flex flex-col gap-6 py-6">
            {conversations.map((conversation, index) => (
              <div
                key={`convstn_${index + 1}`}
                className="border-b border-slate-400 flex items-center gap-2 px-3 pb-4 cursor-pointer"
              >
                <div className="w-[17%]">
                  <div className="w-10 h-10 rounded-full bg-primary"></div>
                </div>
                <div className="w-[63%]">
                  <h3 className="font-semibold truncate">
                    Lorem ipsum dolor sit amet.
                  </h3>
                  <p className="truncate text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae?
                  </p>
                </div>
                <div className="w-[20%]">
                  <div className="whitespace-nowrap text-xs text-slate-600 flex justify-end">
                    21-12-23
                  </div>
                  <div className="flex justify-end">
                    <div className="w-6 h-6 rounded-full bg-success text-white grid place-items-center text-xs">
                      5
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[calc(100vh-100px)] grid place-items-center">
            <div className="">
              <AvatarGroup isBordered isDisabled>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
              </AvatarGroup>
              <p className="text-center max-w-[200px] mx-auto">
                Join others to get answer to your questions
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full h-[50px] bg-[#F9F9F9]">
        <div className="px-6">
          <Button className="bg-primary text-white w-full">
            New Conversation
          </Button>
        </div>
      </footer>
    </div>
  );
}
