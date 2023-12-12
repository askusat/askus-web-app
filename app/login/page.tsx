"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Image } from "@nextui-org/react";
import AuthLayout from "../components/layout/authLayout";
// ** Hooks
import { useAuth } from "../hooks/useAuth";
import { LoginParam } from "../context/AuthProvider";
import Link from "next/link";

export default function Login() {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    message: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (loading) return;

    auth.login(
      { email, password } as LoginParam,
      (error) => {
        console.log("loginError", error);
        setErrorMsg({
          title: "Failed to login",
          message: error.message,
        });
      },
      setLoading
    );
  };

  return (
    <>
      <AuthLayout>
        <div className="w-full px-[5%] md:px-[10%] lg:px-[15%] xl:px-[20%]">
          <Link href="/">
            <Image src="/logo-2.svg" alt="logo" width={200} height={40} />
          </Link>

          <h5 className="font-bold font-PlusJakartaSansBold text-black/80 text-[18px] md:text-[25px] mt-4 mb-1 -ml-2">
            👋 Welcome back
          </h5>

          <p className="mb-4 text-[17px]">Login into you account</p>

          {errorMsg?.message && (
            <div className="bg-red-300 py-3 px-4 rounded-lg text-gray-900">
              <div className="font-bold">{errorMsg.title}</div>
              <div className="">{errorMsg.message}</div>
            </div>
          )}

          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              if (!email || !password) return;
              email && password && handleLogin(e);
            }}
          >
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px] mb-[8px]"
              >
                Email Address
              </label>
              <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)]">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full py-3 outline-none border-none"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={({ target }) =>
                    setEmail(target.value.toLowerCase())
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-[8px]">
                <label
                  htmlFor="password"
                  className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px]"
                >
                  Password
                </label>
                <Link href="/forget-password">
                  <span className="text-primary text-xs">Forgot Password?</span>
                </Link>
              </div>
              <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)]">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  id="password"
                  className="w-full py-3 outline-none border-none"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <div className="flex items-center justify-center h-[50px]">
                  {showPassword && (
                    <FaEyeSlash
                      color="#8094AE"
                      className={`${
                        showPassword
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none max-w-0 min-w-0 w-0 h-0"
                      } transition-all duration-300 min-w-[20px] h-auto cursor-pointer`}
                      width={25}
                      height={25}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                  {!showPassword && (
                    <FaEye
                      color="#8094AE"
                      className={`${
                        !showPassword
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none max-w-0 min-w-0 w-0 h-0"
                      } transition-all duration-300 min-w-[20px] h-auto cursor-pointer`}
                      width={25}
                      height={25}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full`}
              color="primary"
              isLoading={loading}
            >
              {loading ? "Processing..." : "Sign in"}
            </Button>
            <p className="text-center text-[#8091A7] italic text-sm mt-3">
              {`Don't have an account?`}{" "}
              <Link href="/signup" className="text-primary">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}
