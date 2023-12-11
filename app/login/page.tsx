"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Image, Link } from "@nextui-org/react";
import AuthLayout from "../components/layout/authLayout";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    title: "Alert",
    message: "something went wrong",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //   useEffect(() => {
  //     const regContd = async (authUser) => {
  //       const user = await getUser(authUser?.id);
  //       // console.log('await getUser(authUser?.id): user');
  //       // console.log(user);
  //       if (user && user.status === 200 && user.obj) {
  //         if (user.status === 500) {
  //           console.log(user.obj);
  //           alert('an error occured');
  //           setLoading(false);
  //           return user;
  //         } else {
  //           navigate(`/dashboard/${user?.obj?.username}`);
  //         }
  //         setLoading(false);
  //         return user;
  //       } else {
  //         // register user to db
  //         // console.log('register user to db');
  //         const { error } = await supabase.from('users').insert({
  //           user_id: authUser?.id,
  //           full_name: authUser?.user_metadata?.full_name || '',
  //           email: authUser?.email?.toLowerCase(),
  //           username: '',
  //         });
  //         if (error) {
  //           console.log(error);
  //           setLoading(false);
  //           alert('User record not recorded, try again or contact support');
  //           return { status: 500, message: 'User record not recorded' };
  //         } else {
  //           const { key, ref } = getRefCode();
  //           if (ref) {
  //             navigate(`/search?${key}=${ref}`);
  //           } else {
  //             navigate(`/search`);
  //           }
  //           return { status: 200, message: 'success' };
  //         }
  //       }
  //     };

  //     const getData = async () => {
  //       const {
  //         data: { user },
  //       } = await supabase.auth.getUser();
  //       // console.log('await supabase.auth.getUser: user');
  //       // console.log(user);
  //       const u = user ? await getUser(user?.id) : null;
  //       // console.log('await supabase.auth.getUser: u');
  //       // console.log(u);
  //       if (!u.obj) {
  //         // new user
  //         const contd = await regContd(user);
  //         contd?.status !== 200 && showErrorAlert(contd);
  //         return;
  //       }
  //       if (u?.status === 200 && u?.obj?.username)
  //         return navigate(`/dashboard/${u?.obj?.username}`);
  //       // console.log(u);
  //     };

  //     getData();
  //   }, [navigate]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const authUserObj = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authUserObj?.error) {
      console.log(authUserObj?.error?.message);
      if (authUserObj?.error?.message === "Invalid login credentials") {
        showErrorAlert(authUserObj?.error);
        // alert(`${authUserObj.error.message}, please check your credentials and try again`);
        setLoading(false);
        return;
      }
      if (
        authUserObj.error?.message ===
        `Cannot read properties of null (reading 'id')`
      ) {
        // alert('User not found please try again or register')
        setIsModalOpen(true);
        setErrorMsg({
          title: "Login Error",
          message: "User not found please try again or register",
        });
        return;
      } else {
        // alert('An error occurred, please try again')
        setIsModalOpen(true);
        setErrorMsg({
          title: "Login Error",
          message: "An error occurred, please try again",
        });
        return;
      }
    }

    if (authUserObj?.error) {
      setLoading(false);
      return;
    }

    // const contd = await regContd(authUserObj?.data?.user);
    // if (contd?.status !== 200) return showErrorAlert(contd);

    setLoading(false);
  };

  function showErrorAlert(error: any) {
    if (error) {
      console.log(error);
      setIsModalOpen(true);
      setErrorMsg({ title: "Login Error", message: error?.message });
    }
  }

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
              onClick={() => {}}
              className={`${
                (!email || !password) && "!cursor-not-allowed"
              } w-full`}
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
