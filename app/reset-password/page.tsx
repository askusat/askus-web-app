"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Image } from "@nextui-org/react";
import AuthLayout from "../components/layout/authLayout";
// ** Hooks
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ title: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    if (password !== cPassword) {
      setErrorMsg({ title: "Alert", message: "Password must be the same" });
      setIsModalOpen(true);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setErrorMsg({
        title: "Alert",
        message: `${error.message}`,
      });
      setIsModalOpen(true);
      return;
    }
    if (data) {
      setErrorMsg({
        title: "Success",
        message: "Password updated successfully!",
      });
      setIsModalOpen(true);
    }
    if (data?.user) return router.push(`/login`);
  };

  useEffect(() => {
    if (!errorMsg) return;
    const sto = setTimeout(() => {
      setErrorMsg({ title: "", message: "" });
    }, 4000);

    return () => {
      clearTimeout(sto);
    };
  }, [errorMsg]);

  return (
    <>
      <AuthLayout>
        <div className="w-full px-[5%] md:px-[10%] lg:px-[15%] xl:px-[20%]">
          <Link href="/">
            <Image
              src="/logo-2.svg"
              alt="logo"
              width={200}
              height={40}
              className="h-auto"
            />
          </Link>

          <h5 className="font-bold font-PlusJakartaSansBold text-black/80 text-[18px] md:text-[25px] mt-4 mb-1 -ml-2">
          Reset Password
          </h5>

          <p className="mb-4 text-[17px]">Enter your new password below to reset your password.</p>

          {errorMsg?.message && (
            <div className={`${errorMsg.title === "Success" ? "bg-green-300" : "bg-red-300"} py-3 px-4 rounded-lg text-gray-900`}>
              <div className="font-bold">{errorMsg.title}</div>
              <div className="">{errorMsg.message}</div>
            </div>
          )}

          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              if (!password || !cPassword) return;
              password && cPassword && handleResetPassword(e);
            }}
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-[8px]">
                <label
                  htmlFor="password"
                  className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px]"
                >
                  Password
                </label>
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

            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-[8px]">
                <label
                  htmlFor="password"
                  className="font-PlusJakartaSansSemiBold font-semibold text-[#344357] text-[15px]"
                >
                  Confirm Password
                </label>
              </div>
              <div className="flex items-center gap-3 px-4 border border-[#DBDFEA] bg-white rounded-[8.8px] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(0,_112,_239,_0.10)]">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  name="cPassword"
                  id="cPassword"
                  className="w-full py-3 outline-none border-none"
                  placeholder="Enter your password"
                  required
                  value={cPassword}
                  onChange={({ target }) => setCPassword(target.value)}
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
              aria-label="signin or loading"
              type="submit"
              className={`w-full`}
              color="primary"
              isLoading={loading}
            >
              {loading ? "Processing..." : "Reset"}
            </Button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}
