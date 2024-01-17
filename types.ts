import Stripe from "stripe";

export type User =
  | {
      id?: number;
      createdAt?: Date;
      updatedAt?: Date;
      authUserId: string;
      email: string;
      fullName: string;
      isSubscribed?: boolean;
      subscription_status: Stripe.Subscription.Status;
      credit: number | 0;
      creditExpiresOn: Date;
      stripeCustomerId?: string;
      stripeSubscriptionId?: string;
      isAdmin?: boolean;
      userProfilePicture?: string;
      chatsJoined: number[];
      username: string;
      pushSubscriptions: [];
      // [key: string]: any;
    }
  | null
  | undefined;

export type NotificationType = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
  chatId: number;
  title: string;
  message: string;
  read: boolean;
} | null;

export type Chat = {
  id?: number;
  userId: number; // chat creator
  status: "ongoing" | "answered" | "cancelled" | "reported"; // | string;
  answered: boolean;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  endedAt: Date;
  chatUsers: number[] | any;
} | null;

export type ChatSummary = {
  id?: number;
  userId: number; // chat creator
  status: "ongoing" | "answered" | "cancelled" | "reported"; // | string;
  answered: boolean;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  endedAt: Date;
  chatUsers: number[] | any;
  message: string;
} | null;

export type ChatMessage = {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  endedAt: Date;
  message: string;
  type: string;
  replyTo: string | null;
  chatId: number;
  userId: number;
  toUserId: number;
  userName: string;
  userProfilePicture:
    | "pending"
    | "accepted"
    | "declined"
    | "withdrawn"
    | string; // will be used in 'offer' to indicate the status of the offer.
  sender: "expert" | "user" | "Assistant" | "mary"; // | string;
} | null;

export type Offer = {
  id?: number;
  chat: number; // chat id
  customer: number; // customer id
  stripeCustomerId: string; // stripe customer id
  email: string; // customer email
  sender: number; // sender id
  amount: number;
  description: string;
  status?: "pending" | "accepted" | "declined" | "withdrawn";
  updatedAt?: Date;
  createdAt?: Date;
} | null;

export type createOfferProps = {
  route: string;
  customer_id: string;
  amount: number;
  email: string;
  description: string;
};
