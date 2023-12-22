export type User = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  authUserId: string;
  email: string;
  fullName: string;
  isSubscribed?: boolean;
  credit: number;
  creditExpiresOn: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  isAdmin?: boolean;
  userProfilePicture?: string;
  chatsJoined: number[];
  username: string;
  // [key: string]: any;
} | null | undefined;

export type Notification = {
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
  userProfilePicture: string;
  sender: "expert" | "user"; // | string;
} | null;
