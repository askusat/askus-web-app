"use client";

// ** React Imports
import React, { ReactNode, useCallback } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext, defaultProvider } from "./AuthContext";
import { supabase } from "../supabaseClient";
import { authConfig } from "../config";
import { AuthUser } from "@supabase/supabase-js";
import { User } from "@/types";

export interface LoginParam {
  email: string;
  password: string;
}

export interface SignUpParam {
  email: string;
  password: string;
  fullName: string;
}

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ** States
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
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
    errorCallback: (error: any) => void
  ) => {
    const entryData: Partial<User> = {
      authUserId: authUser.id,
      email: authUser.email || "",
      fullName,
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

  const handleSignup = async (
    params: SignUpParam,
    errorCallback: (error: any) => void,
    setProcessingSignUp: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setProcessingSignUp(true);
    const { email, password, fullName } = params;
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
      await createUserProfile(authUser, fullName, errorCallback);
    } else {
      if (errorCallback) errorCallback(error);
      setProcessingSignUp(false);
      return;
    }
    setProcessingSignUp(false);
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
    await supabase.auth.signOut();
    window.localStorage.removeItem("userData");
    // router.push("/login");
  };

  const values = {
    user,
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
