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
import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaCheck, FaPen } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import { TbRotateRectangle } from "react-icons/tb";
import { useAuth } from "../hooks/useAuth";
import { Chat, ChatMessage, ChatSummary, User } from "@/types";
import { supabase } from "../supabaseClient";
import { formatDateToDMYY, getFirstName } from "../utils/helpers";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const { user, setOnChatPageId, notifications } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState(0);
  const [selectedChat, setSelectedChat] = useState<Chat>(null);
  const [isChatPageOpen, setIsChatPageOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedTab, setSelectedTab] = useState<any>("ongoing");
  const [messageInput, setMessageInput] = useState("");
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [chatMessages, setchatMessages] = useState<ChatMessage[] | []>([]);

  const router = useRouter();

  // URLSearchParams
  useEffect(() => {
    const fetch = async () => {
      const chatId = new URLSearchParams(window.location.search).get("chatId");
      if (chatId) {
        const { data: chat, error } = await supabase
          .from("chats")
          .select()
          .eq("id", chatId)
          .single();
        if (error) {
          router.replace("/chat");
          return;
        }
        resetChatScreen();
        setSelectedChat(chat);
        setSelectedChatId(chat?.id || 0);
        setIsChatPageOpen(true);
        inputRef?.current && inputRef?.current?.focus();
        router.push(`#${chat.id}`);
      } else {
        router.replace("/chat");
        return;
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // setOnChatPageId
  useEffect(() => {
    setOnChatPageId(selectedChatId);

    return () => {
      setOnChatPageId(null);
    };
  }, [selectedChatId, setOnChatPageId]);

  // get all chats_summary for user
  useEffect(() => {
    if (!user?.id) return;

    const fetch = async () => {
      if (user?.isAdmin) {
        const { data, error } = await supabase
          .from("chats") //chats_summary
          .select()
          // .eq("userId", user?.id)
          .eq("answered", selectedTab === "answered");

        if (!error && data.length > 0) {
          setChats(data);
        } else {
          setChats([]);
        }
      } else {
        const { data, error } = await supabase
          .from("chats") //chats_summary
          .select()
          .eq("userId", user?.id)
          .eq("answered", selectedTab === "answered");

        if (!error && data.length > 0) {
          setChats(data);
        } else {
          setChats([]);
        }
      }
    };
    fetch();
  }, [selectedTab, user, isChatPageOpen, selectedChatId]);

  // get all messages for a chat
  useEffect(() => {
    const fetch = async () => {
      if (!user && !selectedChatId && selectedChatId === 0) return;
      const { data, error } = await supabase
        .from("chat_messages") //chats_summary
        .select()
        // .eq("userId", user?.id)
        .eq("chatId", selectedChatId)
        .order("createdAt", { ascending: true });

      if (!error && data.length > 0) {
        setchatMessages(data);
      }
    };
    fetch();
  }, [user, selectedChatId, sendingMessage]);

  // subscribe to chat_messages
  useEffect(() => {
    if (!user?.id) return;

    const chatMessagesChannel = supabase
      .channel("chat messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          // filter: `userId=eq.${user?.id}`,
        },
        (payload) => {
          // console.log("chat_messages payload.new");
          // console.log(payload.new);

          setchatMessages([...chatMessages, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chatMessagesChannel);
    };
  }, [chatMessages, user?.id]);

  useEffect(() => {
    // console.log(`message_-_${chatMessages.length}`);

    const lastMessage = document.getElementById(
      `message_-_${chatMessages?.length}`
    );
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
      inputRef?.current && inputRef?.current?.focus();
    }

    return () => {};
  }, [chatMessages]);

  const createChat = async () => {
    if (!user) return null;

    const createData: Partial<Chat> = {
      title: `ASK-${new Date().getTime()}`,
      userId: user.id,
      chatUsers: [user.id],
    };

    const { data, error } = await supabase
      .from("chats")
      .insert(createData)
      .select()
      .single();

    if (!error && data) {
      return data;
    } else {
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!user?.id) return;

    setSendingMessage(true);
    var chatId = selectedChat?.id;
    if (!selectedChatId || selectedChatId === 0) {
      const chat: ChatSummary | any = await createChat();

      if (chat) {
        chatId = chat?.id;
        setSelectedChatId(chat.id);
        setSelectedChat(chat);
      }
    }

    if (chatId) {
      // Send message
      const createChatMessage: Partial<ChatMessage> = {
        chatId,
        message: messageInput,
        userId: user.id,
        userName: getFirstName(user.fullName),
        userProfilePicture: user.userProfilePicture || "",
      };
      await supabase.from("chat_messages").insert(createChatMessage);

      try {
        const { error } = await supabase
          .from("notifications")
          .delete()
          .eq("chatId", chatId)
          .eq("userId", user?.id);
        error && console.log(error?.message);
      } catch (error) {}

      try {
        for (const index in selectedChat?.chatUsers) {
          if (
            Object.prototype.hasOwnProperty.call(selectedChat?.chatUsers, index)
          ) {
            const chatUserId = selectedChat?.chatUsers[parseInt(index)];

            if (chatUserId !== user?.id) {
              const notfcn = {
                userId: chatUserId,
                chatId: selectedChat.id,
                message: messageInput,
                title: `New message`,
                read: false,
              };
              const { error } = await supabase
                .from("notifications")
                .insert(notfcn);
              console.log(error?.message);
            }
          }
        }
      } catch (error) {}
      setSendingMessage(false);
      setMessageInput("");
    } else {
      resetChatScreen();
    }
    setSendingMessage(false);
  };

  const [addingUserToChat, setAddingUserToChat] = useState(false);
  const addUserToChat = async (
    userId: number | undefined,
    chatId: number | undefined
  ) => {
    if (!userId || !chatId) return alert("something went wrong");

    setAddingUserToChat(true);
    const currentUsers: any = selectedChat?.chatUsers;
    const d = [...currentUsers, userId];
    await supabase.from("chats").update({ chatUsers: d }).eq("id", chatId);

    // Send message
    const createChatMessage: Partial<ChatMessage> = {
      chatId,
      message: `${user?.fullName} just joined the chat ${formatDateToDMYY(
        new Date()
      )}`,
      userId: 0,
      userName: "system",
      userProfilePicture: "",
    };
    await supabase.from("chat_messages").insert(createChatMessage);
    setAddingUserToChat(false);
  };

  const resetChatScreen = () => {
    setSelectedChatId(0);
    setSelectedChat(null);
    setchatMessages([]);
    router.replace("/chat");
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
              onClick={() => {
                resetChatScreen();
              }}
            >
              {/* <div className="w-4 h-4 rounded-full bg-danger text-white grid place-items-center text-xs"></div> */}
              <FaAngleLeft size={20} className="text-white  " />
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="bg-transparent"
              onClick={() => {
                resetChatScreen();
              }}
            >
              <div className="w-4 h-4 rounded-full bg-warning text-white grid place-items-center text-xs"></div>
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="bg-transparent"
              onClick={() => {
                resetChatScreen();
              }}
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
            !(!selectedChatId || selectedChatId === 0 || !isChatPageOpen) &&
            "hidden md:block"
          } max-w-[400px] w-full mt-[50px] py-2 relative`}
        >
          <div className="h-[calc(100vh-140px)] overflow-auto pb-3">
            {chats.length > 0 ? (
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
                  {chats.map((chat, index) => (
                    <div
                      key={`convstn_${index + 1}`}
                      className={`${
                        chats.length !== index + 1 &&
                        "border-b border-slate-400"
                      } ${
                        selectedChatId === chat?.id && "bg-gray-200"
                      } flex items-center gap-2 px-3 py-4 cursor-pointer select-none`}
                      onClick={() => {
                        resetChatScreen();
                        if (!chat) {
                          router.replace("/chat");
                          return;
                        }
                        setSelectedChat(chat);
                        setSelectedChatId(chat?.id || 0);
                        setIsChatPageOpen(true);
                        inputRef?.current && inputRef?.current?.focus();
                        router.push(`#${chat.id}`);
                      }}
                    >
                      <div className="w-[17%]">
                        <div className="w-10 h-10 rounded-full bg-primary"></div>
                      </div>
                      <div className="w-[63%]">
                        <div className="flex items-center">
                          <input
                            className="font-semibold truncate"
                            value={chat?.title}
                            disabled
                          />
                          <Button isIconOnly className="bg-transparent">
                            <FaPen />
                          </Button>
                        </div>
                        <p className="truncate text-sm">
                          {chat?.lastMessage || "New message"}
                        </p>
                      </div>
                      <div className="w-[20%]">
                        <div className="whitespace-nowrap text-xs text-slate-600 flex justify-end">
                          {formatDateToDMYY(chat?.createdAt || new Date())}
                        </div>
                        <div className="mt-1 flex justify-end">
                          {notifications.find(
                            (r) => r?.chatId === chat?.id
                          ) && (
                            <div className="w-6 h-6 rounded-full bg-success text-white grid place-items-center text-xs">
                              {
                                notifications.filter(
                                  (r) => r?.chatId === chat?.id
                                ).length
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-[calc(100vh-100px)] grid place-items-center">
                <div className="">
                  <AvatarGroup isBordered isDisabled max={1000}>
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                  </AvatarGroup>
                  <p className="text-center max-w-[200px] text-gray-400 mx-auto mt-2 text-sm">
                    Join others to get answer to your questions
                  </p>
                </div>
              </div>
            )}
          </div>

          {!user?.isAdmin && (
            <footer className="fixed md:static bottom-0 left-0 w-full h-[65px] py-4 bg-[#F9F9F9]">
              <div className="px-6">
                <Button
                  color="primary"
                  className="text-white w-full"
                  onClick={() => {
                    setIsChatPageOpen(true);
                    inputRef?.current && inputRef?.current?.focus();
                    resetChatScreen();
                  }}
                >
                  Ask New Question
                </Button>
              </div>
            </footer>
          )}
        </div>

        <div
          className={`${
            (!selectedChatId || !isChatPageOpen) && "hidden md:block"
          } w-full mt-[50px] py-2 h-[calc(100vh-50px)] overflow-auto bg-gray-200`}
        >
          <div
            id="chatScreenMain"
            className="h-[calc(100vh-140px)] overflow-auto pb-3 px-4 pt-2"
          >
            {/* {selectedChat?.title && (
              <div className="fixed top-[50px] right-1 w-full">
                <div className="flex items-center justify-center w-full">
                  <div className="border border-gray-600 bg-gray-200 rounded-lg py-1 px-2">
                    <span className="font-semibold text-sm">Title: </span>
                    <input
                      className="italic text-xs"
                      value={selectedChat?.title}
                      disabled
                    />
                  </div>
                  <Button isIconOnly className="bg-transparent">
                    <FaPen />
                  </Button>
                </div>
              </div>
            )} */}

            <div className="flex flex-col gap-4 mt-[50px] mb-5">
              {chatMessages?.length > 0 &&
                chatMessages?.map((chatMessage, index) => {
                  // console.log("chatMessage: ");
                  // console.log(chatMessage);

                  if (chatMessage?.userName === "system") {
                    return (
                      <div key={`message-${chatMessage?.id}`} className="border-y border-gray-400/50 py-2 px-4">
                        <p className="text-center text-sm">{chatMessage?.message}</p>
                      </div>
                    )
                  } else {
                    if (chatMessage?.userId === user?.id) {
                      return (
                        <div
                          key={`message-${chatMessage?.id}`}
                          id={`message_-_${index + 1}`}
                          className="flex-row-reverse flex items-end gap-2"
                        >
                          <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-warning"></div>
                          <div className="">
                            <div className="px-4 py-2 bg-gray-300/70 rounded-xl rounded-br-none w-fit">
                              <p className="text-sm">
                                {chatMessage?.message}
                                <span className="text-xs font-semibold bg-gray-400/40 ml-2 p-1 rounded-lg">
                                  {formatDateToDMYY(
                                    chatMessage?.createdAt || new Date()
                                  )}
                                </span>
                              </p>
                            </div>
                            <div className="text-xs text-end">
                              {chatMessage?.userName}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={`message-${chatMessage?.id}`}
                          id={`message_-_${index + 1}`}
                          className="flex items-start gap-2"
                        >
                          <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-primary"></div>
                          <div className="">
                            <div className="text-xs">
                              {chatMessage?.userName}
                            </div>
                            <div className="px-4 py-2 bg-gray-300 rounded-xl rounded-tl-none w-fit">
                              <p className="text-sm">
                                {chatMessage?.message}
                                <span className="text-xs font-semibold bg-gray-400/40 ml-2 p-1 rounded-lg">
                                  {formatDateToDMYY(
                                    chatMessage?.createdAt || new Date()
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                })}
            </div>

            {chatMessages?.length <= 0 && (
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
                </div>
              </div>
            )}
          </div>

          <div className="fixed md:static bottom-0 left-0 bg-gray-200 w-full h-[65px] px-4">
            {(selectedChat && selectedChat?.chatUsers?.includes(user?.id)) ||
            !selectedChat ? (
              <form
                className="-mt-2 py-2 border border-primary rounded-full bg-gray-200 relative z-20"
                onSubmit={(e: any) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="px-6 flex items-center gap-0">
                  <Button isIconOnly size="sm" className="bg-transparent">
                    <ImAttachment size={18} />
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
                    isLoading={sendingMessage}
                  >
                    <IoIosSend size={20} />
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    addUserToChat(user?.id, selectedChat?.id);
                  }}
                  isLoading={addingUserToChat}
                  color="primary"
                >
                  Join Chat
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
