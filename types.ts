export type User = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  authUserId: string;
  email: string;
  fullName: string;
  isSubscribed?: boolean;
  credit: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  isAdmin?: boolean;
  userProfilePicture?: string;
  chatsJoined: number[];
  [key: string]: any;
} | null;

export type Notification = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
  chatId: number;
  title: string;
  message: string;
  read: boolean;
} | null;

export type Chat = {
  id: number;
  userId: number; // chat creator
  status: "ongoing" | "answered" | "cancelled" | "reported" | string;
  answered: boolean;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  endedAt: Date;
  chatUsers: number[] | any;
} | null;

export type ChatSummary = {
  id: number;
  userId: number; // chat creator
  status: "ongoing" | "answered" | "cancelled" | "reported" | string;
  answered: boolean;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  endedAt: Date;
  chatUsers: number[] | any;
  lastMessage: string;
} | null;

export type ChatMessage = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  chatId: number;
  userId: number;
  userName: string;
  userProfilePicture: string;
  sender: "expert" | "user" | string;
} | null;
