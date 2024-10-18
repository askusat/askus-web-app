"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/loadingScreen";
import Nav from "../components/layout/nav";
import { AiOutlineFundView } from "react-icons/ai";
import {
  FaCheck,
  FaCheckCircle,
  FaHome,
  FaLock,
  FaPen,
  FaRegUserCircle,
} from "react-icons/fa";
import { MdOutlineLoop } from "react-icons/md";
import { IoMdHelp } from "react-icons/io";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";
import { Button, Image, Input } from "@nextui-org/react";
import { User } from "@/types";
import {
  formatDateToDMYY,
  formatDateToTimeAgo,
  sAlert,
} from "../utils/helpers";
import Stripe from "stripe";
import axios from "axios";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function ProfilePage() {
  const auth = useAuth();
  const user = auth.user;
  const router = useRouter();
  const [ongoingQs, setOngoingQs] = useState<number>(0);
  const [answeredQs, setAnsweredQs] = useState<number>(0);
  const [subscriptionDetails, setSubscriptionDetails] =
    useState<Stripe.Subscription | null>(null);
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [cancellingSub, setCancellingSub] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const authUser = await supabase.auth.getUser();
        if (!authUser.data.user) return router.push("/#login");
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [router]);

  // get users questions history
  useEffect(() => {
    const fetch = async () => {
      if (!auth.user) return;
      // if (auth.user.isAdmin) {
      //   router.replace("/admin");
      // }

      const { count: answeredCount } = await supabase
        .from("chats")
        .select("*", { count: "exact", head: true })
        .eq("userId", auth.user.id)
        .eq("answered", true);
      setAnsweredQs(answeredCount || 0);

      const { count: ongoingCount } = await supabase
        .from("chats")
        .select("*", { count: "exact", head: true })
        .eq("userId", auth.user.id)
        .eq("answered", false);
      setOngoingQs(ongoingCount || 0);
    };
    fetch();
  }, [auth.user, router]);

  useEffect(() => {
    const fetch = async () => {
      if (!auth.user?.stripeCustomerId) return;
      const subscriptionRes = await axios.post(`/api/stripe`, {
        route: "get_subscription",
        subscription_id: auth.user?.stripeCustomerId,
      });
      // console.log("subscriptionRes.data.subscription");
      // console.log(subscriptionRes.data.subscription);

      setSubscriptionDetails(subscriptionRes.data.subscription);
    };
    fetch();
  }, [auth.user?.stripeCustomerId]);

  const handleCancelSubscription = async () => {
    setCancellingSub(true);
    try {
      const response = await axios.post(`/api/stripe`, {
        route: "delete_subscription",
        subscription_id: auth.user?.stripeSubscriptionId,
      });
      // console.log("handleCancelSubscriptionj response: ");
      // console.log(response);

      if (response.status === 200) {
        sAlert("Subscription cancelled successfully!");
        await supabase
          .from("users")
          .update({ isSubscribed: false })
          .eq("id", user?.id);
      } else {
        sAlert("Subscription cancellation failed!", true);
      }
    } catch (error: any) {
      console.log("error");
      console.log(error?.response?.data?.message);
      if (
        error?.response?.data?.message
          ?.toLowerCase()
          .startsWith("no such subscription")
      ) {
        sAlert("Subscription already cancelled");
        await supabase
          .from("users")
          .update({ isSubscribed: false })
          .eq("id", user?.id);
        window.location.reload();
      } else {
        sAlert(
          "Subscription cancellation failed! \n" +
            error?.response?.data?.message,
          true
        );
      }
    }
    setTimeout(() => {
      setCancellingSub(false);
      onClose();
    }, 2000);
  };

  if (!auth.user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cancel Subscription
              </ModalHeader>
              <ModalBody>
                <p>
                  <strong>@{auth.user?.username}</strong>, Are you sure you want
                  to cancel your subscription
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleCancelSubscription}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <LoadingScreen />
      <nav className="max-h-[6rem] sticky top-0 z-20 col-[1/-1] row-[1] md:px-8 px-4 py-3 bg-[#F9F9F9] shadow-lg">
        <Nav />
      </nav>

      <div className="relative flex min-h-[calc(100vh-6rem)] mb-12">
        <aside className="hidden lg:block w-[25%] max-h-[calc(100vh-6rem)] xl:sticky lg:static top-20 bg-primary text-white">
          <div className="h-full relative">
            <div className="flex flex-col gap-6 mt-8 px-8 w-full">
              <Link href="">
                <Button
                  aria-label="Overview"
                  startContent={<AiOutlineFundView />}
                  className="flex justify-start w-full"
                >
                  Overview
                </Button>
              </Link>
              <Link href={"#ongoing"}>
                <Button
                  aria-label="ongoing"
                  startContent={<MdOutlineLoop />}
                  className="flex justify-start w-full"
                >
                  Ongoing{" "}
                  <div className="w-6 h-6 grid place-items-center rounded-md bg-primary text-white">
                    {ongoingQs}
                  </div>
                </Button>
              </Link>
              <Link href={"#answered"}>
                <Button
                  aria-label="answered"
                  startContent={<FaCheckCircle />}
                  className="flex justify-start w-full"
                >
                  Answered{" "}
                  <div className="w-6 h-6 grid place-items-center rounded-md bg-primary text-white">
                    {answeredQs}
                  </div>
                </Button>
              </Link>
              {/* <Link href={"#subscription"}>
                <Button
                aria-label="answered"
                startContent={<IoCashOutline />}
                className="flex justify-start w-full"
                >
                Subscription / Credit
                </Button>
              </Link> */}
              <Link href={"/faq"}>
                <Button
                  aria-label="faq"
                  startContent={<IoMdHelp />}
                  className="flex justify-start w-full"
                >
                  Help
                </Button>
              </Link>

              <Link href={"/reset-password"}>
                <Button
                  aria-label="reset-password"
                  startContent={<FaLock />}
                  className="flex justify-start w-full"
                >
                  Reset Password
                </Button>
              </Link>
            </div>

            <div className="absolute bottom-0 py-6 left-0 w-full flex justify-center bg-[#F9F9F9]">
              {user?.isAdmin ? (
                <Link href="/admin">
                  <Button
                    aria-label="Get started button"
                    className="bg-primary text-white"
                  >
                    Go to admin dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/chat">
                  <Button
                    aria-label="Get started button"
                    className="bg-primary text-white"
                  >
                    Start Conversation
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </aside>

        <main className="w-full min-h-[100vh] bg-[#F9F9F9] pb-20">
          <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <div className="md:mt-16 mt-4 w-full max-w-[400px] mx-4 h-[300px] rounded-xl overflow-hidden border-b-[8px] border-primary shadow-xl flex flex-col justify-center items-center text-[18px] relative">
                <Button
                  aria-label="circle"
                  className="bg-transparent absolute top-3 right-2"
                  isIconOnly
                >
                  <div className="bg-primary w-10 h-10 rounded-full"></div>
                </Button>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full grid place-items-center bg-primary">
                    <FaRegUserCircle size={60} color="white" />
                  </div>
                  {/* <div className="absolute -bottom-2 -right-3">

                    aria-label="Get started button"
                      className="w-7 h-7 min-w-6 min-h-6 rounded-full grid place-items-center"
                      isIconOnly
                    >
                      <FaPen size={12} />
                    </Button>
                  </div> */}
                </div>
                <DisplayUserName user={auth.user} setUser={auth.setUser} />
                <Button
                  aria-label="Get started button"
                  variant="ghost"
                  className="mt-3 border border-[#CBCBCB] py-2 px-4 rounded-xl"
                >
                  {auth.user?.email}
                </Button>
              </div>

              {!auth.user?.isSubscribed && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <Link href={"/payment"}>
                    <Button
                      aria-label="subscribe"
                      className="border-2 border-primary bg-primary text-white"
                    >
                      Subscribe
                    </Button>
                  </Link>
                  {/* <span className="text-gray-500">or</span>
                  <Link href={"/payment#credit"}>
                    <Button aria-label="Get started button"  className="border-2 border-primary bg-white">
                      Buy Credit
                    </Button>
                  </Link> */}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
                <div className="h-[150px] min-w-[215px] flex flex-col justify-between bg-white shadow-xl rounded-md border-b-[5px] border-[#EBA125] text-center px-8 py-4">
                  <div className="text-[16px] w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold">
                    {ongoingQs}
                  </div>
                  <div className="text-[#2B2B2B] text-[28px] font-bold font-MontserratBold">
                    Ongoing
                  </div>
                </div>
                <div className="h-[150px] min-w-[215px] flex flex-col justify-between bg-white shadow-xl rounded-md border-b-[5px] border-success text-center px-8 py-4">
                  <div className="text-[16px] w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold">
                    {answeredQs}
                  </div>
                  <div className="text-[#2B2B2B] text-[28px] font-bold font-MontserratBold">
                    Answered
                  </div>
                </div>
                <div className="h-[150px] min-w-[215px] flex flex-col justify-between bg-white shadow-xl rounded-md border-b-[5px] border-[#9005FE] text-center px-8 py-4">
                  <div className="flex justify-between">
                    <div className="text-[16px] w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold">
                      {auth.user?.credit || 0}
                    </div>
                    <Link
                      href={`/payment#credit`}
                      className="text-[16px] w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold"
                    >
                      +
                    </Link>
                  </div>

                  <div className="text-[#2B2B2B] pt-6 text-[28px] font-bold font-MontserratBold">
                    Credits
                  </div>
                  {auth.user?.credit ? (
                    <div className="flex items-center justify-center">
                      <div className=" text-[10px] text-gray-500 justify-center">
                        Expires on{" "}
                        {formatDateToDMYY(auth.user?.creditExpiresOn)}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="h-[150px] min-w-[215px] flex flex-col justify-between bg-white shadow-xl rounded-md border-b-[5px] border-primary text-center px-8 py-4">
                  <div className="text-[20px] font-bold">
                    <span className="capitalize">
                      {subscriptionDetails?.status}
                    </span>
                    {auth.user?.isSubscribed && subscriptionDetails ? (
                      <div className=" text-[10px] font-normal text-gray-500 justify-start">
                        <span className="">Renewing</span>{" "}
                        {subscriptionDetails &&
                          formatDateToTimeAgo(
                            new Date(
                              subscriptionDetails?.current_period_end * 1000
                            )
                          )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="text-[#2B2B2B] text-[28px] font-bold font-MontserratBold">
                    Subscription
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <Link href={"/reset-password"} className="lg:hidden">
              <Button
                color="primary"
                aria-label="reset-password"
                startContent={<FaLock />}
                className="flex justify-start w-full"
              >
                Reset Password
              </Button>
            </Link>

            {auth.user.isSubscribed && (
              <Button color="danger" onPress={onOpen}>
                Cancel Subscription
              </Button>
            )}
          </div>
        </main>
      </div>

      {/* <div className="fixed z-[999999] bottom-20 right-2">
        <Button aria-label="Get started button" className="bg-primary text-white w-[50px] h-[50px]" isIconOnly>
          <IoCreateOutline size={24} />
        </Button>
      </div> */}
      {/* <MobileFooter /> */}
    </>
  );
}

// const MobileFooter = () => {
//   return (
//     <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full bg-white py-3 px-3">
//       <div className="flex items-center justify-center gap-5 md:gap-8">
//         <Link
//           href=""
//           onClick={() => {
//             window.scrollTo(0, 0);
//             window.location.reload();
//           }}
//         >
//           <Button
//             isIconOnly
//             variant="faded"
//             aria-label="Overview"
//             title="Overview"
//             className="bg-primary shadow-none border-none"
//           >
//             <FaHome className="text-white" />
//           </Button>
//         </Link>
//         <Link
//           href="#ongoing"
//           onClick={() => {
//             window.scrollTo(0, 0);
//             window.location.reload();
//           }}
//         >
//           <Button
//             isIconOnly
//             variant="faded"
//             aria-label="Ongoing"
//             title="Ongoing"
//             className="bg-primary shadow-none border-none"
//           >
//             <MdOutlineLoop className="text-white" />
//           </Button>
//         </Link>
//         <Link
//           href="#answered"
//           onClick={() => {
//             window.scrollTo(0, 0);
//             window.location.reload();
//           }}
//         >
//           <Button
//             isIconOnly
//             variant="faded"
//             aria-label="Answered"
//             title="Answered"
//             className="bg-primary shadow-none border-none"
//           >
//             <FaCheckCircle className="text-white" />
//           </Button>
//         </Link>
//         <Link
//           href="#subscription"
//           onClick={() => {
//             window.scrollTo(0, 0);
//             window.location.reload();
//           }}
//         >
//           <Button
//             isIconOnly
//             variant="faded"
//             aria-label="Subscription / Credits"
//             title="Subscription / Credits"
//             className="bg-primary shadow-none border-none"
//           >
//             <IoCashOutline className="text-white" />
//           </Button>
//         </Link>
//         {/* <Link href="/faq">
//           <Button
//             isIconOnly
//             variant="faded"
//             aria-label="Help"
//             title="Help"
//             className="bg-primary shadow-none border-none"
//           >
//             <IoMdHelp className="text-white" />
//           </Button>
//         </Link> */}
//       </div>
//     </div>
//   );
// };

interface DisplayUserNameProp {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const DisplayUserName = ({ user, setUser }: DisplayUserNameProp) => {
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username);
  const [loading, setLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    seterrorMsg("");
    if (!user) return;
    if (loading) return;

    setLoading(true);
    const { data: newUser, error } = await supabase
      .from("users")
      .update({ username: newUsername })
      .eq("id", user.id)
      .select()
      .single();
    if (error) {
      seterrorMsg(error.message);
    }
    !error && newUser && setUser(newUser);
    setLoading(false);
    setEditMode(false);
  };

  return (
    <>
      <div className="mt-6 flex items-center -mr-6">
        <h3 className="">{user?.username}</h3>
        <Button
          aria-label="edit"
          className="bg-transparent"
          isIconOnly
          onClick={() => {
            setEditMode(!editMode);
            seterrorMsg("");
          }}
        >
          <FaPen size={12} />
        </Button>
      </div>
      {errorMsg && <p className="text-xs text-warning">{errorMsg}</p>}
      {editMode && (
        <form className="flex items-center gap-1" onSubmit={handleSubmit}>
          <Input
            type="text"
            size="sm"
            className="p-0"
            value={newUsername}
            onChange={(e: any) => setNewUsername(e.target.value)}
          />
          <Button
            aria-label="confirm"
            className="bg-primary text-white"
            isIconOnly
            type="submit"
            isLoading={loading}
          >
            <FaCheck size={12} />
          </Button>
        </form>
      )}
    </>
  );
};
