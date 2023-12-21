"use client";

import {
  Avatar,
  AvatarGroup,
  Button,
  Image as ImageNUI,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaCheck, FaPen, FaTimes } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { ImAttachment } from "react-icons/im";
import { IoIosSend, IoMdDocument } from "react-icons/io";
import { TbRotateRectangle } from "react-icons/tb";
import { useAuth } from "../hooks/useAuth";
import { Chat, ChatMessage, ChatSummary, User } from "@/types";
import { supabase } from "../supabaseClient";
import { formatDateToTimeAgo, formatDate } from "../utils/helpers";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/loadingScreen";
import { nanoid } from 'nanoid'

export default function ChatPageV2() {
  const {
    user,
    loading: authLoading,
    setOnChatPageId,
    notifications,
  } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState(0);
  const [selectedChat, setSelectedChat] = useState<Chat>(null);
  const [refreshChatList, setRefreshChatList] = useState(false);
  const [refreshChatMessage, setRefreshChatMessage] = useState(false);
  const [isChatPageOpen, setIsChatPageOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<any>("ongoing");
  const [messageInput, setMessageInput] = useState("");
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [chatMessages, setchatMessages] = useState<ChatMessage[]>([]);
  const [editChatTitleProp, setEditChatTitleProp] = useState<number | null>(
    null
  );
  const [chatTitle, setChatTitle] = useState("");
  const [seletectedFiles, setSeletectedFiles] = useState<any[]>([]);

  // refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollToViewRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // subscribe to chats insert
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("chats")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chats",
        },
        async (payload) => {
          if (payload.new) {
            setRefreshChatList(true);
          }
        }
      )
      .subscribe();
    const channelUpdate = supabase
      .channel("chatsupdate")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chats",
        },
        (payload) => {
          // Handle UPDATE event payload
          setRefreshChatList(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(channelUpdate);
    };
  }, [user]);

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
        // inputRef?.current && inputRef?.current?.focus();
        router.push(`?chatId=${chat.id}`);
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

  // get all chats_view for user
  useEffect(() => {
    if (!user?.id) return;

    const fetch = async () => {
      if (editChatTitleProp !== null) return;
      // if (user?.isAdmin) {
      //   const { data, error } = await supabase
      //     .from("chat_view") //chats_summary
      //     .select()
      //     // .eq("userId", user?.id)
      //     .eq("answered", selectedTab === "answered")
      //     .order("updatedAt", { ascending: false });
      //   if (!error && data.length > 0) {
      //     setChats(data);
      //   } else {
      //     setChats([]);
      //   }
      // } else {
      //   const { data, error } = await supabase
      //     .from("chats") //chats_summary
      //     .select()
      //     .eq("userId", user?.id)
      //     .eq("answered", selectedTab === "answered");

      //   if (!error && data.length > 0) {
      //     setChats(data);
      //   } else {
      //     setChats([]);
      //   }
      // }
      if (user?.isAdmin) {
        const { data, error } = await supabase
          .from("chat_view") //chats_summary
          .select()
          // .eq("userId", user?.id)
          .eq("answered", selectedTab === "answered")
          .order("updatedAt", { ascending: false });
        if (!error && data.length > 0) {
          setChats(data);
          // if (!document.hasFocus() && !notDelay) {
          //   const notificationSound = "/message.mp3";
          //   const sound = new Audio(notificationSound);
          //   sound.play();
          // }
        } else {
          setChats([]);
        }
      } else {
        const { data, error } = await supabase
          .from("chat_view") //chats_summary
          .select()
          .eq("userId", user?.id)
          .eq("answered", selectedTab === "answered");

        if (!error && data.length > 0) {
          setChats(data);
          // if (!document.hasFocus() && !notDelay) {
          //   const notificationSound = "/message.mp3";
          //   const sound = new Audio(notificationSound);
          //   sound.play();
          // }
        } else {
          setChats([]);
        }
      }
      setRefreshChatMessage(false);
      setRefreshChatList(false);
    };
    fetch();
  }, [
    selectedTab,
    user,
    isChatPageOpen,
    selectedChatId,
    editChatTitleProp,
    refreshChatList,
  ]);

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

  // subscribe to chat_messages for admins
  useEffect(() => {
    if (!user || !user?.isAdmin) return;

    const chatMessagesChannel = supabase
      .channel("chat messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          // console.log("chat_messages payload.new");
          // console.log(payload.new);

          setRefreshChatMessage(false);

          if (payload.new.userId !== user.id) {
            const notificationSound = "/message.mp3";
            const sound = new Audio(notificationSound);
            sound.play();
          }
          setRefreshChatList(true);
          if (selectedChat) {
            setchatMessages([...chatMessages, payload.new as ChatMessage]);
            scrollToViewRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chatMessagesChannel);
    };
  }, [chatMessages, selectedChat, user]);

  // subscribe to chat_messages for user
  useEffect(() => {
    if (!user || user?.isAdmin) return;

    const chatMessagesChannel = supabase
      .channel("chat messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `toUserId=eq.${user.id}`,
        },
        (payload) => {
          // console.log("chat_messages payload.new");
          // console.log(payload.new);

          if (
            !user?.isAdmin &&
            payload.new.toUserId === user?.id &&
            selectedChat?.chatUsers?.includes(user.id)
          ) {
            if (payload.new.userId !== user.id) {
              const notificationSound = "/message.mp3";
              const sound = new Audio(notificationSound);
              sound.play();
            }
            setchatMessages([...chatMessages, payload.new as ChatMessage]);
            setRefreshChatList(true);
            scrollToViewRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }

          setRefreshChatMessage(false);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chatMessagesChannel);
    };
  }, [chatMessages, selectedChat, user]);

  // scrollIntoView last message of a chat
  useEffect(() => {
    // // console.log(`message_-_${chatMessages.length}`);
    // if (!chatMessages || chatMessages?.length < 1) return;
    // const lastMessage = document.getElementById(
    //   `message_-_${chatMessages?.length}`
    // );
    // if (lastMessage) {
    //   // lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
    //   lastMessage.scrollIntoView(false);
    //   // inputRef?.current && inputRef?.current?.focus();
    //   return;
    // }
    // // alert("message not loaded");
    // console.log("message not loaded");

    // scrollToViewRef.current?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    // });
    scrollToViewRef.current?.scrollIntoView(false);
  }, [chatMessages]);

  function scrollLastMsgIntoView() {
    scrollToViewRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    // const lastMessage = document.getElementById(
    //   `message_-_${chatMessages?.length}`
    // );
    // if (lastMessage) {
    //   lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
    //   // lastMessage.scrollIntoView(false);
    //   // inputRef?.current && inputRef?.current?.focus();
    // }
  }

  const createChat = async () => {
    if (!user) return null;

    const createData: Partial<Chat> = {
      title: `${nanoid(6)}-${user?.username}`,
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

  // setSendingMessage
  const handleSubmit = async () => {
    if (!user?.id || sendingMessage) return;

    setSendingMessage(true);
    setMessageInput("");
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
      if (seletectedFiles.length > 0) {
        for (const i in seletectedFiles) {
          if (Object.prototype.hasOwnProperty.call(seletectedFiles, i)) {
            const file = seletectedFiles[i];
            const { data, error } = await supabase.storage
              .from("chatmedia")
              .upload(`chats/${chatId}/${file.name}`, file, {
                upsert: true,
              });

            if (!error) {
              const {
                data: { publicUrl },
              }: any = supabase.storage
                .from("chatmedia")
                .getPublicUrl(data?.path || "");

              const createChatFileMessage: Partial<ChatMessage> = {
                chatId,
                message: publicUrl,
                type: file.type.split("/")[0] === "image" ? "image" : "file",
                replyTo: null,
                userId: user.id,
                toUserId: selectedChat?.chatUsers.find(
                  (u: number) => u !== user.id
                ),
                userName: user.username, //getFirstName(user.fullName),
                userProfilePicture: user.userProfilePicture || "",
                sender: user.isAdmin ? "expert" : "user",
              };

              await supabase
                .from("chat_messages")
                .insert(createChatFileMessage);
            } else {
              console.log(`failed to upload media file: ${file.name}`);
            }
          }
        }
        setSeletectedFiles([]);
      }

      if (messageInput) {
        const createChatMessage: Partial<ChatMessage> = {
          chatId,
          message: messageInput,
          type: "text",
          replyTo: null,
          userId: user.id,
          toUserId: selectedChat?.chatUsers.find((u: number) => u !== user.id),
          userName: user.username, //getFirstName(user.fullName),
          userProfilePicture: user.userProfilePicture || "",
          sender: user.isAdmin ? "expert" : "user",
        };

        await supabase.from("chat_messages").insert(createChatMessage);
        await supabase
          .from("chats")
          .update({ updatedAt: new Date() })
          .eq("id", chatId);
      }

      // console.log("window.innerWidth: ");
      // console.log(window.innerWidth);

      if (window.innerWidth > 500) {
        inputRef?.current && inputRef?.current?.focus();
      }

      scrollLastMsgIntoView();

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
              error && console.log(error?.message);
            }
          }
        }
      } catch (error) {}
      setSendingMessage(false);
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
    if (!user) return;
    if (selectedChat?.chatUsers.length === 2) {
      alert("An expert has already joined!");
    }
    if (!userId || !chatId) return alert("something went wrong");

    setAddingUserToChat(true);
    const currentUsers: any = selectedChat?.chatUsers;
    const d = [...currentUsers, userId];
    await supabase.from("chats").update({ chatUsers: d }).eq("id", chatId);

    // Send message
    const createChatMessage: Partial<ChatMessage> = {
      chatId,
      message: `${user?.fullName} just joined the chat ${formatDate(
        new Date()
      )}`,
      type: "text",
      replyTo: null,
      userId: user.id,
      toUserId: selectedChat?.chatUsers.find((u: number) => u !== user.id),
      userName: "system",
      userProfilePicture: "",
    };
    await supabase.from("chat_messages").insert(createChatMessage);
    await supabase
      .from("chats")
      .update({ updatedAt: new Date() })
      .eq("id", chatId);
    scrollLastMsgIntoView();
    const oldList = selectedChat?.chatUsers;
    const c: any = { ...selectedChat, chatUsers: [...oldList, user.id] };
    setSelectedChat(c);
    router.replace(`/chat?chatId=${chatId}`);
    setAddingUserToChat(false);
  };

  const resetChatScreen = () => {
    setSelectedChatId(0);
    setSelectedChat(null);
    setchatMessages([]);
    setIsChatPageOpen(false);
    router.replace("/chat");
  };

  const [windowHeight, setWindowHeight] = useState(0);

  // does nothing
  useEffect(() => {
    setWindowHeight(window.innerHeight);

    function handleResize() {
      const newHeight = window.innerHeight;
      const footer = document.getElementById("footer");
      const footerSpacer = document.getElementById("footerSpacer");

      if (windowHeight > newHeight) {
        // Address bar might have been hidden
        console.log("Address bar might have been hidden.");
        if (footer && footerSpacer) {
          // footerSpacer.classList.add("h-10")
          // footer.classList.add("absolute", "md:static", "bottom-2")
        }
      } else if (windowHeight < newHeight) {
        // Address bar might have been shown
        // alert("Address bar might have been shown.");
        if (footer && footerSpacer) {
          // footerSpacer.classList.remove("h-10")
          // footer.classList.remove("absolute", "md:static", "bottom-2")
        }
        console.log("Address bar might have been shown.");
      }

      setWindowHeight(newHeight);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [windowHeight]);

  if (!user && authLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="h-screen w-screen overflow-hidden relative">
        <header className="fixed z-50 top-0 left-0 w-full bg-primary text-white h-[8vh] box-border">
          <div className="flex items-center justify-between gap-2 h-full px-2">
            <nav className="flex items-center h-full">
              <Button
                isIconOnly
                size="sm"
                className="bg-transparent"
                onClick={() => {
                  if (selectedChat) {
                    resetChatScreen();
                  } else {
                    if (window.confirm("Do you want to leave the chat?")) {
                      router.push("/");
                    }
                  }
                }}
              >
                {/* <div className="w-4 h-4 rounded-full bg-danger text-white grid place-items-center text-xs"></div> */}
                {isChatPageOpen ? (
                  <FaAngleLeft size={20} className="text-white  " />
                ) : (
                  <FaTimes size={20} className="text-red-600  " />
                )}
              </Button>
              {/* <Button
              isIconOnly
              size="sm"
              className="bg-transparent"
              onClick={() => {
                resetChatScreen();
              }}
            >
              <div className="w-4 h-4 rounded-full bg-warning text-white grid place-items-center text-xs"></div>
            </Button> */}
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
            </nav>

            <div className="text-xs text-center">{selectedChat?.title}</div>

            <Link href={"/"}>
              <ImageNUI
                src="/footer.svg"
                alt=""
                width={132}
                height={29}
                className="w-auto h-[35px] md:mr-2 mr-4"
              />
            </Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr,3fr] md:grid-cols-[1fr,2fr] w-full h-[92vh] mt-[8vh] overflow-hidden">
          <aside
            className={`${
              isChatPageOpen && "hidden md:block"
            } bg-primary h-screen w-screen md:w-full`}
          >
            <div
              className={`${
                !user?.isAdmin && "h-[calc(92vh-80px)]"
              } h-[92vh] overflow-auto bg-white`}
            >
              <div className="py-2 flex w-full flex-col items-center">
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

              <div className="py-3 overflow-auto bg-white">
                {chats.length > 0 ? (
                  <div className="flex flex-col gap-0">
                    {chats.map((chat, index) => {
                      return (
                        <div
                          key={`convstn_${index + 1}`}
                          className={`${
                            chats.length !== index + 1 &&
                            "border-b border-slate-400"
                          } ${
                            selectedChatId === chat?.id && "bg-gray-200"
                          } flex items-center gap-2 px-3 py-4 cursor-pointer select-none hover:bg-gray-300`}
                          onClick={() => {
                            if (editChatTitleProp !== null) return;
                            resetChatScreen();
                            if (!chat) {
                              router.replace("/chat");
                              return;
                            }
                            setSelectedChat(chat);
                            setSelectedChatId(chat?.id || 0);
                            setIsChatPageOpen(true);
                            // inputRef?.current && inputRef?.current?.focus();
                            router.push(`?chatId=${chat.id}`);
                          }}
                        >
                          <div className="w-[17%]">
                            <div className="w-10 h-10 rounded-full bg-primary"></div>
                          </div>
                          <div className="w-[63%] md:max-w-[200px]">
                            <div className="flex items-center">
                              <input
                                className={`${
                                  editChatTitleProp &&
                                  editChatTitleProp === chat?.id &&
                                  "outline-none p-2"
                                } font-semibold truncate leading-3`}
                                value={
                                  chatTitle && editChatTitleProp === chat?.id
                                    ? chatTitle
                                    : chat?.title
                                }
                                onChange={(e: any) =>
                                  setChatTitle(e.target.value)
                                }
                                id={`chatMain-${chat?.id}`}
                                disabled={
                                  !editChatTitleProp ||
                                  editChatTitleProp !== chat?.id
                                }
                              />

                              <button
                                // isIconOnly
                                className="bg-transparent leading-3"
                                onClick={async () => {
                                  const inputEl: any = document.getElementById(
                                    `chatMain-${chat?.id}`
                                  );

                                  if (inputEl) {
                                    inputEl.focus();
                                    if (editChatTitleProp) {
                                      const { error } = await supabase
                                        .from("chats")
                                        .update({ title: inputEl?.value })
                                        .eq("id", editChatTitleProp);

                                      if (error) {
                                        alert(error.message);
                                      } else {
                                        setEditChatTitleProp(null);
                                      }
                                    } else {
                                      inputEl.focus();
                                      setEditChatTitleProp(chat?.id || null);
                                    }
                                  }
                                }}
                              >
                                {editChatTitleProp !== chat?.id ? (
                                  <FaPen />
                                ) : (
                                  <FaCheck size={20} className="text-primary" />
                                )}
                              </button>
                            </div>
                            <p className="truncate text-sm">{chat?.message}</p>
                          </div>
                          <div className="w-[20%]">
                            <div className="whitespace-wrap text-xs text-slate-600 flex justify-end">
                              {formatDateToTimeAgo(
                                chat?.createdAt || new Date()
                              )}
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
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-full grid place-items-center">
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
                        Join others to get answers to your questions
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!user?.isAdmin && (
              <footer className="fixed md:static grid place-items-center bottom-0 w-full h-[80px] bg-white">
                <div className="px-6">
                  <Button
                    color="primary"
                    className="text-white w-full"
                    onClick={() => {
                      resetChatScreen();
                      setIsChatPageOpen(true);
                      inputRef?.current && inputRef?.current?.focus();
                    }}
                  >
                    Ask New Question
                  </Button>
                </div>
              </footer>
            )}
          </aside>

          <main
            className={`${
              !isChatPageOpen ? "hidden md:block" : ""
            } bg-green-200 dfixed dtop-0 dleft-0 w-full h-[92vh]`}
          >
            <div
              id="chatScreenMain"
              className="h-[calc(92vh-80px)] overflow-auto py-4 bg-gray-200"
            >
              {chatMessages?.length > 0 && (
                <div className="flex flex-col gap-4 px-4 py-2">
                  {chatMessages?.map((chatMessage, index) => {
                    if (chatMessage?.chatId === selectedChat?.id) {
                      if (chatMessage?.userName === "system") {
                        return (
                          <div
                            key={`message-${chatMessage?.id}`}
                            id={`message_-_${index + 1}`}
                            className="border-y border-gray-400/50 py-2 px-4"
                          >
                            <p className="text-center text-sm">
                              {chatMessage?.message}
                            </p>
                          </div>
                        );
                      } else {
                        if (chatMessage?.userId === user?.id) {
                          return (
                            <div
                              key={`message-${chatMessage?.id}`}
                              id={`message_-_${index + 1}`}
                              className="flex flex-row-reverse items-end gap-2 w-full"
                            >
                              <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-warning grid place-items-center text-xs select-none">
                                you
                              </div>
                              <div className="flex flex-col items-end w-fit md:max-w-[70%]">
                                <div className="px-4 py-2 bg-gray-300/70 rounded-xl rounded-br-none w-fit max-w-[200px] break-words md:max-w-[100%]">
                                  {chatMessage?.type === "text" && (
                                    <p className="text-sm">
                                      {chatMessage?.message}
                                    </p>
                                  )}
                                  {chatMessage?.type === "image" && (
                                    <ImageNUI
                                      src={chatMessage?.message}
                                      // fill
                                      isZoomed
                                      alt="Preview"
                                      className="w-[150px] h-[150px] static"
                                    />
                                  )}
                                  {chatMessage?.type !== "text" &&
                                    chatMessage?.type !== "image" && (
                                      <div className="relative">
                                        <IoMdDocument size={50} />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-[9px] text-center text-white mt-1">
                                          {chatMessage?.type}
                                        </div>
                                      </div>
                                    )}
                                </div>
                                <div className="text-xs text-end flex justify-end">
                                  <div className="">
                                    <span className="text-xs p-1 rounded-lg">
                                      {formatDateToTimeAgo(
                                        chatMessage?.createdAt || new Date()
                                      )}
                                    </span>
                                    | {chatMessage?.userName}{" "}
                                    <span className="text-[9px]">
                                      {user?.isAdmin && `(Expert)`}
                                    </span>
                                  </div>
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
                              <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-primary text-white grid place-items-center text-xs select-none">
                                {user?.isAdmin ? "user" : "expert"}
                              </div>
                              <div className="md:max-w-[70%]">
                                <div className="text-xs">
                                  {chatMessage?.userName} |
                                  <span className="text-xs p-1 rounded-lg">
                                    {formatDateToTimeAgo(
                                      chatMessage?.createdAt || new Date()
                                    )}
                                  </span>
                                </div>
                                <div className="px-4 py-2 bg-gray-300 rounded-xl rounded-tl-none w-fit max-w-[200px] break-words md:max-w-[100%]">
                                  {chatMessage?.type === "text" && (
                                    <p className="text-sm">
                                      {chatMessage?.message}
                                    </p>
                                  )}
                                  {chatMessage?.type === "image" && (
                                    <ImageNUI
                                      src={chatMessage?.message}
                                      // fill
                                      isZoomed
                                      alt="Preview"
                                      className="w-[150px] h-[150px] static"
                                    />
                                  )}
                                  {chatMessage?.type !== "text" &&
                                    chatMessage?.type !== "image" && (
                                      <div className="relative">
                                        <IoMdDocument size={50} />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-[9px] text-center text-white mt-1">
                                          {chatMessage?.type}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }
                    }
                  })}
                  <div
                    ref={scrollToViewRef}
                    id="footerSpacer"
                    className="h-16"
                  ></div>
                </div>
              )}

              {chatMessages?.length <= 0 && (
                <div className="grid place-items-center h-full">
                  <div className="">
                    <Button
                      className="bg-primary text-white"
                      onClick={() => {
                        inputRef?.current && inputRef?.current?.focus();
                      }}
                      disabled={user?.isAdmin}
                    >
                      Ask Question
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div
              id="footer"
              className="fixed md:static bottom-0 h-[80px] bg-gray-200 w-full px-4 md: grid place-items-center"
            >
              {(selectedChat &&
                !selectedChat.answered &&
                selectedChat?.chatUsers?.includes(user?.id)) ||
              !selectedChat ? (
                <form
                  className="w-full py-2 border border-primary rounded-full bg-gray-200 relative z-20"
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // Prevents new line in textarea if Shift+Enter is pressed
                      handleSubmit(); // Call your submit function here
                    }
                  }}
                >
                  <div className="px-3 flex items-center gap-0 w-full">
                    {user?.isAdmin && (
                      <Popover
                        showArrow
                        offset={10}
                        placement="bottom"
                        backdrop={"blur"}
                      >
                        <PopoverTrigger>
                          <Button
                            isIconOnly
                            color="default"
                            size="sm"
                            variant="flat"
                            className="capitalize"
                          >
                            <HiDotsVertical />
                          </Button>
                        </PopoverTrigger>
                        <MenuContent
                          user={user}
                          chat={selectedChat}
                          scrollLastMsgIntoView={scrollLastMsgIntoView}
                          setSelectedChat={setSelectedChat}
                        />
                      </Popover>
                    )}
                    {seletectedFiles.length > 0 && (
                      <div className="absolute z-[50] bottom-[60px] rounded-lg w-[200px] h-[150px] bg-white shadow-xl text-center">
                        <div className="flex flex-wrap items-center gap-2 p-2">
                          {seletectedFiles.map((file: any, index) => {
                            // console.log("file: ");
                            // console.log(file);
                            const imageUrl = URL.createObjectURL(file);
                            return (
                              <div
                                key={`file_-${index + 1}`}
                                className="relative group"
                              >
                                {file.type.startsWith("image") ? (
                                  <ImageNUI
                                    src={imageUrl}
                                    isZoomed
                                    alt="Preview"
                                    className="w-[50px] h-[50px]"
                                  />
                                ) : (
                                  <div className="relative">
                                    <IoMdDocument size={50} />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-[9px] text-center text-white mt-1">
                                      {
                                        file.name.split(".")[
                                          file.name.split(".").length - 1
                                        ]
                                      }
                                    </div>
                                  </div>
                                )}
                                <div
                                  className="hidden absolute z-20 top-0 left-0 w-full h-full bg-black/30 group-hover:grid place-items-center cursor-pointer"
                                  onClick={() => {
                                    const n = seletectedFiles.filter(
                                      (file, i) => i !== index
                                    );
                                    setSeletectedFiles(n);
                                  }}
                                >
                                  <FaTimes size={18} color="red" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div className="pr-6 pl-3 flex items-center gap-0 w-full">
                      <div className="relative w-[18px] h-[18px]">
                        <input
                          ref={fileRef}
                          type="file"
                          name="file"
                          id="file"
                          multiple
                          className="relative z-20 w-[18px] h-[18px] cursor-pointer opacity-0"
                          accept=".jpg, .jpeg, .png, .webp, .gif, .pdf, .doc, .docx, .txt"
                          onChange={(e: any) => {
                            setSeletectedFiles([
                              ...seletectedFiles,
                              ...e.target.files,
                            ]);
                          }}
                        />
                        <label
                          htmlFor="file"
                          id="file"
                          className="absolute top-0 left-0 z-10 w-[18px] h-[18px]"
                        >
                          <ImAttachment size={18} />
                        </label>
                      </div>
                      <textarea
                        ref={inputRef}
                        className="bg-transparent outline-none px-2 pb-3 pt-[10px] placeholder:pt-[5px] w-full h-[40px] resize-none placeholder:text-sm scrolled-remove focus:ring-0 focus-visible:ring-0"
                        tabIndex={0}
                        placeholder="Enter message here..."
                        value={messageInput}
                        onChange={(e: any) => setMessageInput(e.target.value)}
                        // disabled={sendingMessage}
                      ></textarea>
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
                  </div>
                </form>
              ) : (
                <JoinChatButton
                  user={user}
                  chat={selectedChat}
                  scrollLastMsgIntoView={scrollLastMsgIntoView}
                  addUserToChat={addUserToChat}
                  addingUserToChat={addingUserToChat}
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

const JoinChatButton = ({
  user,
  chat,
  selectedChat,
  setSelectedChat,
  scrollLastMsgIntoView,
  addUserToChat,
  addingUserToChat,
}: MenuContentProps) => {
  const [loading, setLoading] = useState(false);
  if (!user || !chat) return;

  const reOpenChat = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("chats")
      .update({ answered: false })
      .eq("id", chat.id)
      .select()
      .single();
    if (!error && data) {
      setSelectedChat(data);
      // Send message
      const createChatMessage: Partial<ChatMessage> = {
        chatId: chat.id,
        message: `${user?.fullName} re-opend the chat ${formatDate(
          new Date()
        )}`,
        type: "text",
        replyTo: null,
        userId: user.id,
        toUserId: selectedChat?.chatUsers.find((u: number) => u !== user.id),
        userName: "system",
        userProfilePicture: "",
      };
      await supabase.from("chat_messages").insert(createChatMessage);
      await supabase
        .from("chats")
        .update({ updatedAt: new Date() })
        .eq("id", chat?.id);
    }
    scrollLastMsgIntoView();
    setLoading(false);
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={() => {
          if (!chat?.answered) {
            addUserToChat(user?.id, chat?.id);
          } else {
            reOpenChat();
          }
        }}
        isLoading={addingUserToChat || loading}
        color="primary"
      >
        {chat?.answered ? "Reopen Chat" : "Join Chat"}
      </Button>
    </div>
  );
};

interface MenuContentProps {
  user: User;
  chat: Chat;
  selectedChat: Chat;
  setSelectedChat: any;
  scrollLastMsgIntoView: () => void;
  addUserToChat: any;
  addingUserToChat: any;
}

const MenuContent = ({
  user,
  chat,
  scrollLastMsgIntoView,
  setSelectedChat,
  selectedChat,
}: Partial<MenuContentProps>) => {
  const [loading, setLoading] = useState(false);
  if (!user || !chat) return;

  const handEndConversation = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("chats")
      .update({ answered: true })
      .eq("id", chat.id)
      .select()
      .single();
    if (!error && data) {
      setSelectedChat(data);
      // Send message
      const createChatMessage: Partial<ChatMessage> = {
        chatId: chat.id,
        message: `${user?.fullName} ended the chat ${formatDate(new Date())}`,
        type: "text",
        replyTo: null,
        userId: user.id,
        toUserId: selectedChat?.chatUsers.find((u: number) => u !== user.id),
        userName: "system",
        userProfilePicture: "",
      };
      await supabase.from("chat_messages").insert(createChatMessage);
      await supabase
        .from("chats")
        .update({ updatedAt: new Date() })
        .eq("id", chat?.id);
    }
    scrollLastMsgIntoView && scrollLastMsgIntoView();
    setLoading(false);
  };

  return (
    <PopoverContent className="w-[240px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p
            className="text-small font-bold text-foreground mb-3"
            {...titleProps}
          >
            Options
          </p>

          <div className="flex flex-col gap-4">
            <Button
              color="warning"
              className=""
              onClick={handEndConversation}
              isLoading={loading}
            >
              End Conversation
            </Button>
          </div>
        </div>
      )}
    </PopoverContent>
  );
};
