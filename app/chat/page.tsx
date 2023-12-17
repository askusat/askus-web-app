"use client";

import {
  Avatar,
  AvatarGroup,
  Button,
  Image,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import { TbRotateRectangle } from "react-icons/tb";

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
  const [selectedChatId, setSelectedChatId] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedTab, setSelectedTab] = useState<any>("ongoing");
  const [messageInput, setMessageInput] = useState("");

  const handleSubmit = async () => {
    // TODO: implement send message
    setMessageInput("");
  };

  return (
    <div className="h-screen w-full">
      <nav className="fixed top-0 left-0 z-10 w-full h-[50px] bg-primary text-white">
        <div className="flex items-center justify-between h-full px-2">
          <div className="flex items-center h-full">
            <Button
              isIconOnly
              size="sm"
              className="bg-transparent"
              onClick={() => setSelectedChatId(0)}
            >
              <div className="w-4 h-4 rounded-full bg-danger text-white grid place-items-center text-xs"></div>
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="bg-transparent"
              onClick={() => setSelectedChatId(0)}
            >
              <div className="w-4 h-4 rounded-full bg-warning text-white grid place-items-center text-xs"></div>
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="bg-transparent"
              onClick={() => setSelectedChatId(0)}
            >
              <div className="w-4 h-4 rounded-full bg-success text-white grid place-items-center text-xs"></div>
            </Button>
          </div>
          <Link href={"/"}>
            <Image
              src="/footer.svg"
              alt=""
              width={132}
              height={29}
              className="w-auto h-[35px] md:mr-2 mr-4"
            />
          </Link>
        </div>
      </nav>

      <main className="md:flex h-[calc(100vh-15px)] overflow-hidden">
        <div
          className={`${
            selectedChatId && "hidden md:block"
          } max-w-[400px] w-full mt-[50px] py-2 relative`}
        >
          <div className="h-[calc(100vh-140px)] overflow-auto pb-3">
            {conversations.length > 0 ? (
              <>
                <div className="flex w-full flex-col items-center">
                  <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="bordered"
                    onSelectionChange={setSelectedTab}
                  >
                    <Tab
                      key="ongoing"
                      title={
                        <div className="flex items-center space-x-2">
                          <TbRotateRectangle />
                          <span>Ongoing</span>
                        </div>
                      }
                    />
                    <Tab
                      key="answered"
                      title={
                        <div className="flex items-center space-x-2">
                          <FaCheck />
                          <span>Answered</span>
                        </div>
                      }
                    />
                  </Tabs>
                </div>
                <div className="flex flex-col gap-0 py-6">
                  {conversations.map((conversation, index) => (
                    <div
                      key={`convstn_${index + 1}`}
                      className={`${
                        conversations.length !== index + 1 &&
                        "border-b border-slate-400"
                      } ${
                        selectedChatId === index + 1 && "bg-gray-200"
                      } flex items-center gap-2 px-3 py-4 cursor-pointer select-none`}
                      onClick={() => setSelectedChatId(index + 1)}
                    >
                      <div className="w-[17%]">
                        <div className="w-10 h-10 rounded-full bg-primary"></div>
                      </div>
                      <div className="w-[63%]">
                        <h3 className="font-semibold truncate">
                          Lorem ipsum dolor sit amet.
                        </h3>
                        <p className="truncate text-sm">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Repudiandae?
                        </p>
                      </div>
                      <div className="w-[20%]">
                        <div className="whitespace-nowrap text-xs text-slate-600 flex justify-end">
                          21-12-23
                        </div>
                        <div className="mt-1 flex justify-end">
                          <div className="w-6 h-6 rounded-full bg-success text-white grid place-items-center text-xs">
                            5
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
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
          </div>

          <footer className="fixed md:static bottom-0 left-0 w-full h-[65px] py-4 bg-[#F9F9F9]">
            <div className="px-6">
              <Button
                className="bg-primary text-white w-full"
                onClick={() => {
                  inputRef?.current && inputRef?.current?.focus();
                }}
              >
                Ask Question
              </Button>
            </div>
          </footer>
        </div>

        <div
          className={`${
            !selectedChatId && "hidden md:block"
          } w-full mt-[50px] py-2 h-[calc(100vh-50px)] overflow-auto bg-gray-200`}
        >
          <div className="h-[calc(100vh-140px)] overflow-auto pb-3 px-4 pt-2">
            <div className="flex flex-col gap-4">
              <div className="flex-row-reverse flex items-center gap-2">
                <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-warning"></div>
                <div className="px-4 py-2 bg-gray-300/70 rounded-xl rounded-br-none w-fit">
                  <p className="text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Non accusantium exercitationem voluptatem!
                    <span className="text-xs font-semibold"> | 21-12-23</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-primary"></div>
                <div className="px-4 py-2 bg-gray-300 rounded-xl rounded-tl-none w-fit">
                  <p className="text-sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing.
                    <span className="text-xs font-semibold"> | 21-12-23</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid place-items-center h-full">
              <div className="">
                <Button
                  className="bg-primary text-white"
                  onClick={() => {
                    inputRef?.current && inputRef?.current?.focus();
                  }}
                >
                  Ask Question
                </Button>
                <div className="mt-4 font-bold text-center">
                  {selectedChatId}
                </div>
              </div>
            </div>
          </div>

          <div className="fixed md:static bottom-0 left-0 bg-gray-200 w-full h-[65px] px-4">
            <form
              className="-mt-2 py-2 border border-primary rounded-full"
              onSubmit={(e: any) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="px-6 flex items-center gap-0">
                <Button isIconOnly size="sm" className="bg-transparent">
                  <ImAttachment />
                </Button>
                <input
                  ref={inputRef}
                  type="text"
                  className="bg-transparent outline-none p-2 w-full"
                  placeholder="Enter message here..."
                  value={messageInput}
                  onChange={(e: any) => setMessageInput(e.target.value)}
                />
                <Button
                  isIconOnly
                  type="submit"
                  size="sm"
                  className="bg-primary text-white ml-2"
                >
                  <IoIosSend size={20} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
