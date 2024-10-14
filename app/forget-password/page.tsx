"use client";

import { useEffect, useState } from "react";
import { Button, Image } from "@nextui-org/react";
import AuthLayout from "../components/layout/authLayout";
// ** Hooks
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";

// export const metadata = {
//   title: 'Reset Your Password - Easy Recovery | AskUs',
//   description: 'Quickly reset your AskUs password with our straightforward recovery process. Regain access to your account now.'
// }

export default function Login() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) return router.push(`/profile`);
    };

    getData();
  }, [router]);

  const handleSendResetLink = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!email) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    setLoading(false);
    if (error) {
      console.log(error.message);
      if (error?.message === `Cannot read properties of null (reading 'id')`) {
        setIsModalOpen(true);
        setErrorMsg({
          title: "Alert",
          message: "User not found please try again or register",
        });
      } else {
        console.log({ error });
        console.log("message: ", error.message);
        setIsModalOpen(true);
        setErrorMsg({
          title: "Alert",
          message: "An error occurred, please try again",
        });
      }
    } else {
      setPage(1);
    }
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
      <head>
        <title>Reset Your Password - Easy Recovery | AskUs</title>
        <meta
          name="description"
          content="Quickly reset your AskUs password with our straightforward recovery process. Regain access to your account now."
        />
      </head>
      <AuthLayout>
        <div className="w-full px-[5%] md:px-[10%] lg:px-[15%] xl:px-[20%]">
          <Link href="/" className="w-fit">
            <Image
              src="/logo-2.svg"
              alt="logo"
              width={200}
              height={40}
              className="h-auto"
            />
          </Link>

          <h5 className="font-bold font-PlusJakartaSansBold text-black/80 text-[18px] md:text-[25px] mt-4 mb-1 -ml-2">
            {page === 0 ? "👋 Forgot Password?" : "Email has been sent!"}
          </h5>

          <p className="mb-4 text-[17px]">
            {page === 0
              ? "Enter your email address you registered with and you will receive instructions on it to reset your password within minutes."
              : "The recovery email has been sent out to your registered email address. If there isn't any account associated with provided email. Please try again."}
          </p>

          {errorMsg?.message && (
            <div className="bg-red-300 py-3 px-4 rounded-lg text-gray-900">
              <div className="font-bold">{errorMsg.title}</div>
              <div className="">{errorMsg.message}</div>
            </div>
          )}

          {page === 0 ? (
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                if (!email) return;
                email && handleSendResetLink(e);
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

              <Button
                aria-label="signin or loading"
                type="submit"
                className={`w-full`}
                color="primary"
                isLoading={loading}
              >
                {loading ? "Processing..." : "Send"}
              </Button>

              <div className="flex items-center justify-center gap-3 text-sm">
                <Link href={`/registration`} className="text-primary">
                  Login
                </Link>
                <div className="">|</div>
                <Link href={`/registration`} className="text-primary">
                  Register here
                </Link>
              </div>
            </form>
          ) : (
            <>
              <Button color="primary" onClick={() => setPage(0)}>
                Back
              </Button>
            </>
          )}
        </div>
      </AuthLayout>
    </>
  );
}
