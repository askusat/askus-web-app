// ** React Imports
import React from "react";
import { createContext } from "react";
import { LoginParam, SignUpParam } from "./AuthProvider";
import { User, NotificationType } from "@/types";

interface AuthContextType {
  user: User;
  notifications: NotificationType[] | [];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
  setOnChatPageId: React.Dispatch<React.SetStateAction<number | null>>;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signup: (
    params: SignUpParam,
    errorCallback: (error: any) => void,
    setProcessingSignUp?: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  login: (
    params: LoginParam,
    errorCallback: (error: any) => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  logout: () => void;
  showPayment: boolean;
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultProvider: AuthContextType = {
  user: null,
  notifications: [],
  setNotifications: () => [],
  setOnChatPageId: () => null,
  loading: true,
  setUser: () => null,
  setLoading: () => false,
  signup: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => {},
  showPayment: false,
  setShowPayment: () => false,
};

const AuthContext = createContext<AuthContextType>(defaultProvider);

export { AuthContext };
