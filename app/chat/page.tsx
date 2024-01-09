"use client";

import {
  Avatar,
  AvatarGroup,
  Button,
  Image as ImageNUI,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaAngleLeft,
  FaCheck,
  FaDownload,
  FaPen,
  FaTimes,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { ImAttachment } from "react-icons/im";
import { IoIosSend, IoMdDocument } from "react-icons/io";
import { TbRotateRectangle } from "react-icons/tb";
import { useAuth } from "../hooks/useAuth";
import {
  Chat,
  ChatMessage,
  ChatSummary,
  NotificationType,
  User,
} from "@/types";
import { supabase } from "../supabaseClient";
import {
  formatDateToTimeAgo,
  formatDate,
  IS_GREETING,
  sAlert,
} from "../utils/helpers";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/loadingScreen";
import { nanoid } from "nanoid";
import axios from "axios";
import Stripe from "stripe";
import { MdNotificationsActive } from "react-icons/md";
import { VscBellSlashDot } from "react-icons/vsc";
// import addNotification from "react-push-notification";
import { registerServiceWorker } from "../utils/serviceWorker";
import {
  getCurrentPushSubscription,
  registerPushSubscription,
  sendPushSubscriptionToServer,
  unregisterPushNotifications,
} from "../notifications/pushService";

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
  const [imageToPreview, setImageToPreview] = useState<string>(
    "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
  );

  // refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollToViewRef = useRef<HTMLInputElement>(null);

  const {
    isOpen: isOpenNoAssessModal,
    onOpen: onOpenNoAssessModal,
    onClose: onCloseNoAssessModal,
  } = useDisclosure();

  const {
    isOpen: isOpenPreviewImage,
    onOpen: onOpenPreviewImage,
    onClose: onClosePreviewImage,
  } = useDisclosure();

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
      const msg = new URLSearchParams(window.location.search).get("message");
      if (msg) {
        resetChatScreen(false);
        setSelectedChat(null);
        setSelectedChatId(0);
        setIsChatPageOpen(true);

        setMessageInput(msg);
        // setTimeout(() => {
        //   handleSubmit();
        // }, 2000);
        return;
      }

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
        resetChatScreen();
        setSelectedChat(null);
        setSelectedChatId(0);
        setIsChatPageOpen(false);
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
      await supabase
        .from("notifications")
        .delete()
        .eq("chatId", selectedChatId)
        .eq("userId", user?.id);
    };
    fetch();
  }, [user, selectedChatId, sendingMessage]);

  // subscribe to chats update to check if it has been closed
  useEffect(() => {
    if (!user) return;

    const chatsChannel = supabase
      .channel("chats update")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats",
          filter: "status=eq.answered",
        },
        async (payload: any) => {
          // console.log("chat_messages payload.new");
          // console.log(payload.new);

          const chat: Chat = payload.new;
          if (selectedChat?.id === chat?.id) {
            setSelectedChat(chat);
          }

          if (chat?.chatUsers.includes(user.id)) {
            const notificationSound = "/message.mp3";
            const sound = new Audio(notificationSound);
            !user.isAdmin && sound.play();

            setRefreshChatList(true);
            setRefreshChatMessage(true);

            if (selectedChat && selectedChat.id === chat.id) {
              scrollToViewRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chatsChannel);
    };
  }, [chatMessages, selectedChat, user]);

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
        async (payload) => {
          // console.log("chat_messages payload.new");
          // console.log(payload.new);

          if (selectedChat && document.hasFocus()) {
            await supabase
              .from("notifications")
              .delete()
              .eq("chatId", selectedChat.id)
              .eq("userId", user?.id);
          }

          notifyMe();
          setRefreshChatList(true);
          setRefreshChatMessage(false);

          if (payload.new.userId !== user.id) {
            const notificationSound = "/message.mp3";
            const sound = new Audio(notificationSound);
            sound.play();
          }
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
        async (payload) => {
          // console.log("chat_messages payload.new");
          // console.log(payload.new);

          if (selectedChat && document.hasFocus()) {
            await supabase
              .from("notifications")
              .delete()
              .eq("chatId", selectedChat.id)
              .eq("userId", user?.id);
          }

          notifyMe();

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

  const checkAccessibility = async () => {
    if (!user) return false;
    if (user.isAdmin) return true;

    if (user?.credit > 0) {
      return true;
    }

    if (user.credit !== 0 && user.isSubscribed) {
      const subscriptionRes = await axios.post(`/api/stripe`, {
        route: "get_subscription",
        subscription_id: user.stripeCustomerId,
      });
      const subscription: Stripe.Subscription =
        subscriptionRes.data.subscription;
      const allowedStatus = ["active", "trialing"];
      if (allowedStatus.includes(subscription.status)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const [botResponseState, setBotResponseState] = useState<number>(1);

  useEffect(() => {
    if (selectedChat?.chatUsers.length > 1) return;

    chatMessages.forEach((message: ChatMessage) => {
      if (
        message?.message ===
        `Understood, thank you. Our expert can certainly assist you with that. Apart from contacting us today, have you spoken to anyone else or taken any other steps in relation to your query?`
      ) {
        setBotResponseState(3);
      }
      if (
        message?.message ===
        `Thank you, I will now pass you to an expert but before I do is there anything relevant you feel the expert should know in order to assist you?`
      ) {
        setBotResponseState(4);
      }
      if (
        message?.message ===
        `Thank you, I will now pass you to an expert but before I do is there anything relevant you feel the expert should know in order to assist you?`
      ) {
        setBotResponseState(5);
      }
    });
  }, [chatMessages, selectedChat?.chatUsers.length]);

  const botReply = async (
    userMessage: string,
    messageType: "text" | "file",
    selectedChat: Chat
  ) => {
    console.log("Bot reply1");
    console.log(user, selectedChat);

    if (!user || !selectedChat) return;
    const { data } = await supabase
      .from("chats")
      .select()
      .eq("id", selectedChat.id)
      .single();
    const currentChat: Chat | null = data;

    // console.log("currentChat");
    // console.log(currentChat);

    if (!currentChat) return;

    if (currentChat.chatUsers.length > 1) return;

    console.log("Bot reply2");

    var response = "";

    if (messageType !== "text") {
      response = `Hi ${user.username}, how may we help you?`;
    } else {
      const userMessageArray = userMessage.toLowerCase().split(" ");

      if (IS_GREETING(userMessage)) {
        response = `Hi ${user.username}, how may we help you?`;
        setBotResponseState(2);
      } else if (
        userMessageArray.includes("human") ||
        userMessageArray.includes("human?") ||
        userMessageArray.includes("bot") ||
        userMessageArray.includes("bot?")
      ) {
        response = `I am a chatbot, gathering initial information to assist you efficiently. We aim to provide a cost-effective service through this automated process before connecting you to an expert.`;
        setBotResponseState(2);
      } else {
        if (botResponseState < 3) {
          response = `Understood, thank you. Our expert can certainly assist you with that. Apart from contacting us today, have you spoken to anyone else or taken any other steps in relation to your query?`;
          setBotResponseState(3);
        }
        if (botResponseState === 3) {
          response = `Thank you, I will now pass you to an expert but before I do is there anything relevant you feel the expert should know in order to assist you?`;
          setBotResponseState(4);
        }
        if (botResponseState === 4) {
          response = `Thank you, I will now pass you to an expert but before I do is there anything relevant you feel the expert should know in order to assist you?`;
          setBotResponseState(5);
        }
        if (botResponseState === 5) {
          response = `An expert will join shortly...`;
        }
      }
    }

    const createChatMessage: Partial<ChatMessage> = {
      chatId: selectedChat.id,
      message: response,
      type: "text",
      replyTo: null,
      userId: 0,
      toUserId: user.id,
      userName: "Mary",
      userProfilePicture: "",
      sender: "mary",
    };

    setTimeout(async () => {
      await supabase.from("chat_messages").insert(createChatMessage);
      await supabase
        .from("chats")
        .update({ updatedAt: new Date() })
        .eq("id", selectedChat.id);
    }, 1000);
  };

  const checkIfCreditHasExpired = (user: User): boolean => {
    if (!user || !user.creditExpiresOn) return false;

    if (user.creditExpiresOn?.getTime() >= new Date().getTime()) {
      return true;
    }
    return false;
  };

  const createChat = async () => {
    if (!user) return null;
    if (user.isAdmin) {
      sAlert("You're an admin");
    }

    if (checkIfCreditHasExpired(user) && !user.isSubscribed) {
      sAlert(
        "Your credit has expired. and you have not active subscription please subscribe."
      );
      return;
    }

    if (!user.isSubscribed && user.credit <= 0) {
      sAlert("You have to subscribe to use this feature");
      setTimeout(() => {
        // router.push('/payment')
      }, 5000);
      return;
    }

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
      if (user.credit > 0) {
        await supabase
          .from("users")
          .update({ credit: user.credit - 1 })
          .eq("id", user.id);
      }
      return data;
    } else {
      return null;
    }
  };

  // setSendingMessage
  const handleSubmit = async () => {
    if (!user?.id || sendingMessage) return;

    const isPermitted = checkAccessibility();
    if (!isPermitted) return onOpenNoAssessModal();

    setSendingMessage(true);
    var chatId = selectedChat?.id;
    var _selectedChat: Chat = selectedChat;
    if (!selectedChatId || selectedChatId === 0) {
      const chat: ChatSummary | any = await createChat();

      if (chat) {
        setMessageInput("");
        _selectedChat = chat;
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

              const { error } = await supabase
                .from("chat_messages")
                .insert(createChatFileMessage);

              await botReply(publicUrl, "file", _selectedChat);

              const receiverId = selectedChat?.chatUsers.find(
                (uid: number) => uid !== user?.id
              );

              if (!error && receiverId !== user?.id) {
                const notfcn = {
                  userId: receiverId, // id of the user to receive notification
                  chatId: chatId,
                  message: messageInput,
                  title: `New message`,
                  read: false,
                };
                const { error } = await supabase
                  .from("notifications")
                  .insert(notfcn);
                error && console.log(error?.message);
              }
            } else {
              console.log(`failed to upload media file: ${file.name}`);
            }
          }
        }
        setSeletectedFiles([]);
      }

      if (messageInput) {
        setMessageInput("");
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
        await botReply(messageInput, "text", _selectedChat);
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

      const receiverId = selectedChat?.chatUsers.find(
        (uid: number) => uid !== user?.id
      );

      if (receiverId !== user?.id) {
        const notfcn = {
          userId: receiverId, // id of the user to receive notification
          chatId: chatId,
          message: messageInput,
          title: `New message`,
          read: false,
        };
        const { error } = await supabase.from("notifications").insert(notfcn);
        error && console.log(error?.message);
      }

      setSendingMessage(false);
    } else {
      resetChatScreen();
    }
    setSendingMessage(false);
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("chatId", chatId)
        .eq("userId", user?.id);
      error && console.log(error?.message);
    } catch (error) {}
  };

  const [addingUserToChat, setAddingUserToChat] = useState(false);

  const addUserToChat = async (
    userId: number | undefined,
    chatId: number | undefined
  ) => {
    if (!user) return;
    if (selectedChat?.chatUsers.length === 2) {
      alert("An expert has already joined!");
      return;
    }
    if (!userId || !chatId) return sAlert("something went wrong");

    setAddingUserToChat(true);
    const currentUsers: any = selectedChat?.chatUsers;
    const d = [...currentUsers, userId];
    await supabase.from("chats").update({ chatUsers: d }).eq("id", chatId);

    // Send message
    const createChatMessage: Partial<ChatMessage> = {
      chatId,
      message: `${user?.username} just joined the chat ${formatDate(
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

  const resetChatScreen = (goHome: boolean = true) => {
    setSelectedChatId(0);
    setSelectedChat(null);
    setchatMessages([]);
    setIsChatPageOpen(false);
    goHome && router.replace("/chat");
  };

  const [windowHeight, setWindowHeight] = useState(0);

  // todo: delete this useeffect it does nothing
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

  const [grantedNotficationPermission, setGrantedNotficationPermission] =
    useState(false);
  const [processingNotfSub, setProcessingNotfSub] = useState(false);

  async function toggleEnablePushNotification(enabled: boolean) {
    if (processingNotfSub) return;
    setProcessingNotfSub(true);
    try {
      if (enabled) {
        await registerPushSubscription(user);
      } else {
        await unregisterPushNotifications(user);
      }
      setProcessingNotfSub(false);
      setGrantedNotficationPermission(enabled);
    } catch (error: any) {
      setProcessingNotfSub(false);
      console.log(error);
      if (enabled && Notification.permission === "denied") {
        alert(
          "Please enable push notification in your browser settings to receive notifications when there's a new message"
        );
      } else {
        sAlert(
          `Something went wrong. please try againg. (${
            error && error.message && error.message
          })`
        );
      }
    }
  }

  // useEffect(() => {
  //   const f = () => {
  //     addNotification({
  //       title: "Warning",
  //       subtitle: "This is a subtitle",
  //       message: "This is a very long message",
  //       theme: "darkblue",
  //       native: true, // when using native, your OS will handle theming.
  //     });
  //     console.log("done");
  //   };
  //   f();

  //   if (window.Notification.permission === "granted") {
  //     setGrantedNotficationPermission(true);
  //   }
  // }, []);

  useEffect(() => {
    async function setUpServiceWorker() {
      try {
        await registerServiceWorker();
      } catch (error) {
        console.log(error);
      }
    }
    setUpServiceWorker();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function syncPushSubscription() {
      try {
        const subscription = await getCurrentPushSubscription();
        if (subscription) {
          await sendPushSubscriptionToServer(subscription, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
    syncPushSubscription();
  }, [user]);

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription();
      setGrantedNotficationPermission(!!subscription);
    }
    getActivePushSubscription();
  }, []);

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      console.log("recieved message from sw:", event.data);
      const chatId = event.data.chatId;
      if (chatId) {
        window.location.href = `/chat?chatId=${chatId}`;
      }
    };
    navigator.serviceWorker.addEventListener("message", messageListener);
    return () =>
      navigator.serviceWorker.removeEventListener("message", messageListener);
  }, []);

  function notifyMe() {
    // console.log("notifyMe");
    // if (!("Notification" in window)) {
    //   // Check if the browser supports notifications
    //   alert("This browser does not support desktop notification");
    // } else if (Notification.permission === "granted") {
    //   // Check whether notification permissions have already been granted;
    //   // if so, create a notification
    //   const notification = new Notification("Hi there!");
    //   // …
    // } else if (Notification.permission !== "denied") {
    //   // We need to ask the user for permission
    //   Notification.requestPermission().then((permission) => {
    //     // If the user accepts, let's create a notification
    //     if (permission === "granted") {
    //       const notification = new Notification("Hi there!");
    //       // …
    //     }
    //   });
    // }
    // // At last, if the user has denied notifications, and you
    // // want to be respectful there is no need to bother them anymore.
  }

  if (!user && authLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpenNoAssessModal}
        onClose={onCloseNoAssessModal}
      >
        <ModalContent>
          {(onCloseNoAssessModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Not Subscribed!
              </ModalHeader>
              <ModalBody>
                <p>
                  Sorry you are not allowed to access this feature because you
                  do not have an active subscription nor any question credit.
                  Please subscribe to continue.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  aria-label="Close"
                  color="danger"
                  variant="light"
                  onPress={onCloseNoAssessModal}
                >
                  Close
                </Button>
                <Link href={"/payment"}>
                  <Button
                    aria-label="Subscribe button"
                    color="primary"
                    onPress={onCloseNoAssessModal}
                  >
                    Subscribe
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        backdrop={"opaque"}
        isOpen={isOpenPreviewImage}
        onClose={() => {
          setImageToPreview("");
          onClosePreviewImage();
        }}
      >
        <ModalContent>
          {(onClosePreviewImage) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Image preview
              </ModalHeader>
              <ModalBody>
                <a
                  href={imageToPreview}
                  download={true}
                  target="_blank"
                  title={imageToPreview}
                >
                  <ImageNUI src={imageToPreview} alt="" />
                </a>
              </ModalBody>
              <ModalFooter>
                <Button
                  aria-label="Close"
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setImageToPreview("");
                    onClosePreviewImage();
                  }}
                >
                  Close
                </Button>
                <a
                  href={imageToPreview}
                  download={true}
                  target="_blank"
                  title={imageToPreview}
                >
                  <Button
                    aria-label="download file"
                    color="primary"
                    isIconOnly
                    onPress={() => {
                      setImageToPreview("");
                      onClosePreviewImage();
                    }}
                  >
                    <FaDownload size={20} />
                  </Button>
                </a>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="h-screen w-screen overflow-hidden relative">
        <header className="fixed z-50 top-0 left-0 w-full bg-primary text-white h-[8vh] box-border">
          <div className="flex items-center justify-between gap-2 h-full px-2">
            <nav className="flex items-center h-full">
              <Button
                aria-label="Leave chat page"
                isIconOnly
                size="sm"
                className="bg-transparent"
                onClick={() => {
                  if (isChatPageOpen) {
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

              <Button
                aria-label="Notification"
                isIconOnly
                size="sm"
                className={`bg-transparent ${
                  processingNotfSub && "animate-pulse"
                }`}
                onClick={async () => {
                  // resetChatScreen();
                  // addNotification({
                  //   title: "Warning",
                  //   // subtitle: "This is a subtitle",
                  //   message: "This is a very long message",
                  //   duration: 3000,
                  //   // theme: "darkblue",
                  //   native: true, // when using native, your OS will handle theming.
                  // });

                  // notifyMe();
                  toggleEnablePushNotification(
                    grantedNotficationPermission ? false : true
                  );
                  return;

                  // window.Notification.requestPermission().then((permission) => {
                  //   console.log("permission");
                  //   console.log(permission);
                  //   new Notification("Thanks");
                  //   if (permission === "granted") {
                  //     if (typeof Notification !== "undefined") {
                  //       new Notification("Thanks2");
                  //     } else {
                  //       console.error("Notification API is not available");
                  //     }
                  //     setGrantedNotficationPermission(true);
                  //   } else {
                  //     setGrantedNotficationPermission(false);
                  //   }
                  // });
                }}
              >
                {grantedNotficationPermission ? (
                  <MdNotificationsActive
                    size={20}
                    color="white"
                    title="Push notification is enabled"
                  />
                ) : (
                  <VscBellSlashDot
                    size={20}
                    color="white"
                    title="Push notification is disabled"
                  />
                )}
              </Button>
            </nav>

            {selectedChat?.title && (
              <div className="text-xs text-center">{selectedChat?.title}</div>
            )}

            {user?.credit === undefined ||
              (!user?.isSubscribed && user?.credit <= 0 && (
                <Link href={"/payment?returnUrl=/chat"}>
                  <Button>Subscribe</Button>
                </Link>
              ))}

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
                                aria-label="Edit Chat tag"
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
                                chat?.updatedAt || new Date()
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
                    aria-label="Ask new question"
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
                              <div className="mb-4 w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-warning grid place-items-center text-xs select-none">
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
                                      onClick={() => {
                                        setImageToPreview(chatMessage.message);
                                        onOpenPreviewImage();
                                      }}
                                      src={chatMessage?.message}
                                      // fill
                                      isZoomed
                                      alt="Preview"
                                      className="w-[150px] h-[150px] static cursor-pointer"
                                    />
                                  )}
                                  {chatMessage?.type !== "text" &&
                                    chatMessage?.type !== "image" && (
                                      <a
                                        href={chatMessage?.message}
                                        download
                                        target="_blank"
                                        className="relative"
                                      >
                                        <IoMdDocument size={50} />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-[9px] text-center text-white mt-1">
                                          {chatMessage?.type}
                                        </div>
                                      </a>
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
                              <div className="mt-4 w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-primary text-white grid place-items-center text-xs select-none">
                                {/* {user?.isAdmin ? "user" : "expert"} */}
                                {chatMessage?.sender}
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
                                      onClick={() => {
                                        setImageToPreview(chatMessage.message);
                                        onOpenPreviewImage();
                                      }}
                                      src={chatMessage?.message}
                                      // fill
                                      isZoomed
                                      alt="Preview"
                                      className="w-[150px] h-[150px] static cursor-pointer"
                                    />
                                  )}
                                  {chatMessage?.type !== "text" &&
                                    chatMessage?.type !== "image" && (
                                      <a
                                        href={chatMessage?.message}
                                        download
                                        target="_blank"
                                        className="relative"
                                      >
                                        <IoMdDocument size={50} />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-[9px] text-center text-white mt-1">
                                          {chatMessage?.type}
                                        </div>
                                      </a>
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
                      aria-label="Ask new question"
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
                            aria-label="Vertical menu dots"
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
                    <div className="pr-0 pl-3 flex items-center gap-0 w-full">
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
                        className="bg-transparent outline-none px-2 pt-[10px] placeholder:pt-[5px] w-full h-[40px] resize-none placeholder:text-sm scrolled-remove focus:ring-0 focus-visible:ring-0"
                        tabIndex={0}
                        placeholder="Enter message here..."
                        value={messageInput}
                        onChange={(e: any) => setMessageInput(e.target.value)}
                        // disabled={sendingMessage}
                      ></textarea>
                      <Button
                        aria-label="Sent message"
                        isIconOnly
                        type="submit"
                        size="sm"
                        className="bg-primary text-white ml-2"
                        isLoading={sendingMessage}
                        onPress={() => {
                          handleSubmit();
                        }}
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
        message: `${user?.username} re-opend the chat ${formatDate(
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
        aria-label="Re open chat"
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
    if (!chat) return;

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
        message: `${user?.username} ended the chat ${formatDate(new Date())}`,
        type: "text",
        replyTo: null,
        userId: user.id,
        toUserId: selectedChat?.chatUsers.find((u: number) => u !== user.id),
        userName: "system",
        userProfilePicture: "",
      };
      const { error } = await supabase
        .from("chat_messages")
        .insert(createChatMessage);
      const { error: e1 } = await supabase
        .from("chats")
        .update({
          status: "answered",
          endedAt: new Date(),
          updatedAt: new Date(),
        })
        .eq("id", chat?.id);

      const notfcn: NotificationType = {
        chatId: chat.id || 0,
        message: `${chat.title} has been marked answered`,
        read: false,
        title: "Conversation marked as answered",
        userId: selectedChat?.chatUsers.find((u: number) => u !== user.id),
      };
      const { error: e2 } = await supabase.from("notifications").insert(notfcn);
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
              aria-label="End conversation"
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
