export type User = {
    id: number;
    authUserId: string;
    email: string;
    fullName: string;
    isSubscribed?: boolean;
    credit: number;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    isAdmin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    [key: string]: any;
  } | null;

export type Question = {
    id: number;
    userId: number;
    userSubscriptionStatus: string;
    title: string;
    status: 'open' | 'close' | 'cancelled' | 'reported' | string;
    createdAt: Date;
    updatedAt: Date;
} | null;

// just type
export type Conversation = {
    id: number;
    senderId: number;
    senderName: string;
    sentByUser: boolean;
    message: string;
    createdAt: Date;
    updatedAt: Date;
} | null;

export type Chat = {
    id: number;
    questionId: number;
    userId: number;
    expertId: number;
    conversations: Conversation[];
    status: 'open' | 'close' | 'cancelled' | 'reported' | string;
    createdAt: Date;
    updatedAt: Date;
    endedAt: Date;
} | null;
