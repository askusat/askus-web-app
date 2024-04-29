import {
  ChatMessage,
  NotificationType,
  Offer,
  User,
  createOfferProps,
} from "@/types";
import { supabase } from "../supabaseClient";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";

export function formatDate(inputDate: Date): string {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString("en-US", options);
  // const formattedTime = date.toLocaleTimeString('en-US', options);

  // return `${formattedDate} - ${formattedTime}`;
  return `${formattedDate}`;
}

export function formatDateToTimeAgo(timestamp: Date): string {
  const timeago = moment(timestamp).fromNow();
  return timeago;
}

export function formatDateToDMYY(timestamp: Date): string {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2); // Extract last 2 digits of the year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

export const markAllNotificationAsRead = async (
  user: User,
  setNotifications: (newNotifications: NotificationType[]) => void
) => {
  await supabase
    .from("notifications")
    .delete() //.update({ read: true })
    .eq("userId", user?.id);

  setNotifications([]);
};

export const markNotificationAsRead = async (
  user: User,
  notification_id: number,
  notifications: NotificationType[],
  setNotifications: (newNotifications: NotificationType[]) => void
) => {
  await supabase
    .from("notifications")
    .delete() //.update({ read: true })
    .eq("userId", user?.id)
    .eq("id", notification_id);

  setNotifications(
    notifications.filter((notification) => notification?.id !== notification_id)
  );
};

export function getFirstName(fullName: string) {
  const firstName = fullName.split(" ")[0];
  return firstName;
}

export function IS_GREETING(sentence: string) {
  const greetings = [
    "hello",
    "hi",
    "hey",
    "howdy",
    "greetings",
    "good morning",
    "good afternoon",
    "good evening",
    "how are you",
  ];

  const regexPatterns = [
    /(?:^|\W)hello(?:$|\W)/i,
    /(?:^|\W)hi(?:$|\W)/i,
    /(?:^|\W)hey(?:$|\W)/i,
    /(?:^|\W)howdy(?:$|\W)/i,
    /(?:^|\W)greetings(?:$|\W)/i,
    /(?:^|\W)good morning(?:$|\W)/i,
    /(?:^|\W)good afternoon(?:$|\W)/i,
    /(?:^|\W)good evening(?:$|\W)/i,
    /(?:^|\W)how are you(?:$|\W)/i,
  ];

  const lowerCaseSentence = sentence.toLowerCase();

  // Check for direct greetings
  if (greetings.some((greeting) => lowerCaseSentence.includes(greeting))) {
    return true;
  }

  // Check using regular expressions for more specific patterns
  if (regexPatterns.some((pattern) => lowerCaseSentence.match(pattern))) {
    return true;
  }

  return false;
}

export const sAlert = (message: string, error?: boolean) => {
  if (error) {
    toast.error(message);
  } else {
    toast(message);
  }
};

export const handleOffer = async (
  accept: boolean,
  message_id: number,
  chatMessage: ChatMessage,
  user: User,
  withdrawOffer: boolean,
  setRefreshChatMessage: any,
  setOfferProcessing: any
) => {
  if (!user) return { statusText: "failed", message: "user not found!" };
  const amount = Number(chatMessage?.type.split("_")[1]);

  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("description", chatMessage?.message)
    .eq("amount", amount)
    .order("createdAt", { ascending: false });

  const offerData: Offer = data?.[0];
  if (error || !offerData) {
    console.log(error, offerData);

    return { statusText: "failed", message: "data incomplete" };
  }

  const updateOfferStatus = async () => {
    const { error: e1 } = await supabase
      .from("offers")
      .update({
        status: withdrawOffer ? "withdrawn" : accept ? "accepted" : "declined",
        updatedAt: new Date(),
      } as Partial<Offer>)
      .eq("id", offerData?.id);

    e1 && console.log("failed to update offer table e1");
    e1 && console.log(e1);
    e1 && console.log(e1?.message);

    const { error: e2 } = await supabase
      .from("chat_messages")
      .update({
        userProfilePicture: withdrawOffer
          ? "withdrawn"
          : accept
          ? "accepted"
          : "declined",
        updatedAt: new Date(),
      } as Partial<ChatMessage>)
      .eq("id", message_id);

    e2 && console.log("failed to update chat_messages table e2");
    e2 && console.log(e2);
    e2 && console.log(e2?.message);

    if (e1 && e2) {
      setOfferProcessing(false);
      sAlert("failed");
      return {
        statusText: "failed",
        message: "something went wrong",
      };
    } else {
      setRefreshChatMessage(true);
      setOfferProcessing(false);
      sAlert("success");
      return {
        statusText: "success",
        message: "success",
      };
    }
  };

  if (withdrawOffer) {
    await updateOfferStatus();
  } else if (accept) {
    try {
      // create customer and subscription
      const createOfferData: createOfferProps = {
        route: "pay_for_custom_offer",
        customer_id: user.stripeCustomerId || "",
        amount: offerData.amount,
        email: user.email,
        description: chatMessage?.message || "",
      };

      const createOfferRes = await axios.post(`/api/stripe`, createOfferData);

      if (createOfferRes.status === 200) {
        await updateOfferStatus();
      } else {
        console.log("createOfferRes");
        console.log(createOfferRes);
        sAlert("something went wrong");
        setOfferProcessing(false);
      }
      return;
    } catch (error: any) {
      setOfferProcessing(false);
      sAlert(`${error?.response?.data?.message || error.message}`);
      console.log("failed to create offer due to: ");
      console.log(error);
      return {
        statusText: "failed",
        message: error?.response?.data?.message || error.message,
      };
    }
  } else {
    await updateOfferStatus();
  }
};
