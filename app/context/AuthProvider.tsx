"use client";

// ** React Imports
import React, { ReactNode, useCallback } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext, defaultProvider } from "./AuthContext";
import { supabase } from "../supabaseClient";
import { authConfig } from "../config";
import { AuthUser } from "@supabase/supabase-js";
import { Notification, User } from "@/types";

export interface LoginParam {
  email: string;
  password: string;
}

export interface SignUpParam {
  email: string;
  password: string;
  fullName: string;
  username: string;
}

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ** States
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [onChatPageId, setOnChatPageId] = useState<number | null>(null);
  // Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const getAndSetUserData = useCallback(
    async (email: string, check: boolean) => {
      const { data: authUserDataM, error: authUserDataError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();
      if (authUserDataError || !authUserDataM) {
        await supabase.auth.signOut();
        localStorage.removeItem("userData");
        setUser(null);
        setLoading(false);
        if (check) return;
        router.replace("/login");
      }
      const authUserData: User | null = authUserDataM as User | null;
      setUser(authUserData);
      if (check) return;
      window.localStorage.setItem("userData", JSON.stringify(authUserData));
      const redirectURL =
        returnUrl && returnUrl !== "/" ? returnUrl : authConfig.afterLogin;
      router.replace(redirectURL as string);
    },
    [router, returnUrl]
  );

  const createUserProfile = async (
    authUser: AuthUser,
    fullName: string,
    username: string,
    errorCallback: (error: any) => void
  ) => {
    const entryData: Partial<User> = {
      authUserId: authUser.id,
      email: authUser.email || "",
      fullName,
      username,
    };

    const { data: authUserDataM, error } = await supabase
      .from("users")
      .insert(entryData);
    if (error) {
      console.log("error creating user profile", error);

      if (errorCallback) errorCallback(error);
      return;
    } else {
      const authUserData: User | null = authUserDataM as User | null;
      setUser(authUserData);
      window.localStorage.setItem("userData", JSON.stringify(authUserData));
      const redirectURL =
        returnUrl && returnUrl !== "/" ? returnUrl : authConfig.afterSignup;
      router.replace(redirectURL as string);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) return setLoading(false);
      getAndSetUserData(user.email || "", true);

      setLoading(false);
    };
    initAuth();
  }, [getAndSetUserData, router]);

  useEffect(() => {
    const getNotifications = async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from("notifications")
        .select()
        .eq("userId", user?.id)
        .eq("read", false)
        .order("updatedAt", { ascending: true });

      if (!error) {
        const notfs: Notification[] = data || [];
        setNotifications(notfs);
      }
    };
    getNotifications();
  }, [user?.id]);

  // subscribe to notifications
  useEffect(() => {
    const channel = supabase
      .channel("realtime notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `userId=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.new?.userId === user?.id) {
            setNotifications([...notifications, payload.new as Notification]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [notifications, user?.id]);

  // subscribe to chat_messages
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("chat messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          // filter: `userId=eq.${user?.id}`,
          // filter: `chatId=any.${JSON.stringify(user?.chatsJoined)}`,
        },
        async (payload) => {
          // console.log("chat_messages context");
          // console.log(payload);

          // if (
          //   payload.new?.chatId !== onChatPageId
          // ) {
          //   const notfcn = {
          //     userId: user?.id,
          //     message: payload.new.message,
          //     title: `New message`,
          //     read: false,
          //   };
          //   setNotifications([...notifications, notfcn as Notification]);
          // }

          // console.log("payload.new?.chatId === onChatPageId: ");
          // console.log(payload.new?.chatId === onChatPageId);
          // console.log(payload.new?.chatId);
          // console.log(onChatPageId);

          if (payload.new?.chatId === onChatPageId) {
            await supabase
              .from("notifications")
              .delete()
              .eq("chatId", onChatPageId)
              .eq("userId", user?.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [notifications, onChatPageId, user]);

  const handleSignup = async (
    params: SignUpParam,
    errorCallback: (error: any) => void,
    setProcessingSignUp: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setProcessingSignUp(true);
    const { email, password, fullName, username } = params;
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.signUp({
      email: email.toString().toLowerCase(),
      password: password?.toString(),
    });
    if (error) {
      if (errorCallback) errorCallback(error);
      setProcessingSignUp(false);
      return;
    }
    // console.log(authUser);

    if (authUser) {
      try {
        await supabase.auth.updateUser({
          data: { displayName: fullName },
        });
      } catch (error) {
        console.error("Error updating user display name", error);
      }
      await createUserProfile(authUser, fullName, username, errorCallback);
    } else {
      if (errorCallback) errorCallback(error);
      setProcessingSignUp(false);
      return;
    }
  };

  const handleLogin = async (
    params: LoginParam,
    errorCallback: (error: any) => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const { email, password } = params;
    setLoading(true);
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (errorCallback) errorCallback(error);
      setLoading(false);
      return;
    }
    if (authUser) {
      await getAndSetUserData(authUser.email || "", false);
    } else {
      if (errorCallback) errorCallback(error);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setUser(null);
    console.log("logging out");

    await supabase.auth.signOut();
    console.log("logged out");
    window.localStorage.removeItem("userData");
    // router.push("/login");
  };

  const values = {
    user,
    notifications,
    setNotifications,
    setOnChatPageId,
    loading,
    setUser,
    setLoading,
    signup: handleSignup,
    login: handleLogin,
    logout: handleLogout,
  };

  // React.Dispatch<React.SetStateAction<User>>

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
