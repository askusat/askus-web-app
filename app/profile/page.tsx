"use client";

import React from "react";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/loadingScreen";
import Layout from "../components/layout";
import Nav from "../components/layout/nav";
import { Button } from "@nextui-org/react";
import { AiOutlineFundView } from "react-icons/ai";
import { FaCheckCircle, FaPen } from "react-icons/fa";
import { MdOutlineLoop } from "react-icons/md";
import { IoCashOutline } from "react-icons/io5";
import { IoMdHelp } from "react-icons/io";

export default function ProfilePage() {
  const auth = useAuth();
  return (
    <>
      <LoadingScreen />
      <nav className="max-h-[6rem] sticky top-0 z-20 col-[1/-1] row-[1] px-8 py-3 bg-[#F9F9F9] shadow-lg">
        <Nav />
      </nav>

      <div className="relative flex min-h-[calc(100vh-6rem)]">
        <aside className="w-[25%] max-h-[calc(100vh-6rem)] xl:sticky lg:static top-20 bg-primary text-white">
          <div className="h-full">
            <div className="flex flex-col gap-6 mt-8 px-8 w-full">
              <Button
                startContent={<AiOutlineFundView />}
                className="flex justify-start"
              >
                Overview
              </Button>
              <Button
                startContent={<MdOutlineLoop />}
                className="flex justify-start"
              >
                Ongiong{" "}
                <div className="w-6 h-6 grid place-items-center rounded-md bg-primary text-white">
                  1
                </div>
              </Button>
              <Button
                startContent={<FaCheckCircle />}
                className="flex justify-start"
              >
                Answered{" "}
                <div className="w-6 h-6 grid place-items-center rounded-md bg-primary text-white">
                  12
                </div>
              </Button>
              <Button
                startContent={<IoCashOutline />}
                className="flex justify-start"
              >
                Subscription / Credit
              </Button>
              <Button
                startContent={<IoMdHelp />}
                className="flex justify-start"
              >
                Help
              </Button>
            </div>

            <div className="absolute bottom-0 py-6 left-0 w-full flex justify-center bg-white">
              <Button className="bg-primary text-white">
                Start Conversation
              </Button>
            </div>
          </div>
        </aside>

        <main className="w-full min-h-[100vh] bg-[#F9F9F9] pb-20">
          <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <div className="mt-16 w-[400px] h-[300px] rounded-xl overflow-hidden border-b-[8px] border-primary shadow-xl flex flex-col justify-center items-center text-[18px] relative">
                <Button className="bg-transparent absolute top-3 right-2">
                  <div className="bg-primary w-10 h-10 rounded-full"></div>
                </Button>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-slate-600"></div>
                  <div className="absolute -bottom-2 -right-3">
                    <Button className="w-7 h-7 min-w-6 min-h-6 rounded-full grid place-items-center">
                      <FaPen size={12} />
                    </Button>
                  </div>
                </div>
                <h3 className="mt-6">{auth.user?.fullName}</h3>
                <Button
                  variant="ghost"
                  className="mt-3 border border-[#CBCBCB] py-2 px-4 rounded-xl"
                >
                  {auth.user?.email}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 mt-10">
                <Button className="border-2 border-primary bg-primary text-white">
                  Subscribe
                </Button>
                <Button className="border-2 border-primary bg-white">
                  Buy Credit
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
                <div className="h-[150px] flex flex-col justify-between bg-white shadow-xl rounded-md border-b-[5px] border-[#EBA125] text-center px-8 py-4">
                  <div className="text-[20px] w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold">
                    1
                  </div>
                  <div className="text-[#2B2B2B] text-[28px] font-bold font-MontserratBold">
                    Ongoing
                  </div>
                </div>
                <div className="h-[150px] flex flex-col justify-between bg-white shadow-xl rounded-md border-b-[5px] border-success text-center px-8 py-4">
                  <div className="text-[20px] w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold">
                    12
                  </div>
                  <div className="text-[#2B2B2B] text-[28px] font-bold font-MontserratBold">
                    Answered
                  </div>
                </div>
                <div className="h-[150px] flex flex-col justify-between bg-white shadow-xl rounded-md border-b-[5px] border-[#9005FE] text-center px-8 py-4">
                  <div className="text-[20px] w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold">
                    {auth.user?.credit || 0}
                  </div>
                  <div className="text-[#2B2B2B] text-[28px] font-bold font-MontserratBold">
                    Credits
                  </div>
                </div>
                <div className="h-[150px] flex flex-col justify-between bg-white shadow-xl rounded-md border-b-[5px] border-primary text-center px-8 py-4">
                  <div className="text-[20px] font-bold">
                    {auth.user?.isSubscribed ? "Active" : "Unsubscribed"}
                  </div>
                  <div className="text-[#2B2B2B] text-[28px] font-bold font-MontserratBold">
                    Subscription
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
