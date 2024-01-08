"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import TableC from "../components/table/table";
import { FaQuestion } from "react-icons/fa";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import Nav from "../components/layout/nav";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";
import axios from "axios";
import Stripe from "stripe";
import { Chat, User } from "@/types";
// import CreateChat from "../components/chat/createChat";

// type User2 = {
//   id: number;
//   createdAt?: Date;
//   updatedAt?: Date;
//   authUserId: string;
//   email: string;
//   fullName: string;
//   isSubscribed?: boolean;
//   subscription_status: Stripe.Subscription.Status
//   credit: number;
//   creditExpiresOn: Date;
//   stripeCustomerId?: string;
//   stripeSubscriptionId?: string;
//   isAdmin?: boolean;
//   userProfilePicture?: string;
//   chatsJoined: number[];
//   username: string;
//   // [key: string]: any;
// };

// export interface Customers extends User2 {
//   stripeCustomers: Stripe.Customer[];
// }

const AdminDashboard = () => {
  const auth = useAuth();
  const router = useRouter();
  const [totalOngoingQs, setTotalOngoingQs] = useState<number>(0);
  const [totalAnsweredQs, setTotalAnsweredQs] = useState<number>(0);
  // const [ongoingQs, setOngoingQs] = useState<number>(0);
  // const [answeredQs, setAnsweredQs] = useState<number>(0);
  const [customers, setCustomers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);

  // get users questions history
  useEffect(() => {
    const fetch = async () => {
      if (!auth.user) return;
      if (!auth.user.isAdmin) {
        router.replace("/profile");
      }

      const { error: getAllAdminsError, data: getAllAdminsdata } =
        await supabase.from("users").select().eq("isAdmin", true);
      !getAllAdminsError && setAdmins(getAllAdminsdata as User[]);

      const { error: getAllChatsError, data: getAllChatsdata } = await supabase
        .from("chats")
        .select();
      !getAllChatsError && setChats(getAllChatsdata as Chat[]);

      const { count: totalAnsweredCount } = await supabase
        .from("chats")
        .select("*", { count: "exact", head: true })
        .eq("answered", true);
      setTotalAnsweredQs(totalAnsweredCount || 0);

      const { count: totalOngoingCount } = await supabase
        .from("chats")
        .select("*", { count: "exact", head: true })
        .eq("answered", false);
      setTotalOngoingQs(totalOngoingCount || 0);

      const { data, error } = await supabase
        .from("users")
        .select()
        // .eq("isAdmin", false)
        .order("updatedAt", { ascending: false });

      if (!error) {
        const supabaseUsers: User[] | null = data;
        setCustomers(
          supabaseUsers.filter((user) => user?.username !== "chatbot")
        );
        // const customersRes = await axios.post(`/api/stripe`, {
        //   route: "get_customers",
        // });

        // const stripeCustomers = customersRes.data?.customers;

        // const mergedUsers: Customers[] = supabaseUsers
        //   ?.map((user: User) => {
        //     const matchingCustomer = stripeCustomers?.find(
        //       (customer: Stripe.Customer) => customer.email === user?.email
        //     );

        //     if (matchingCustomer) {
        //       const newC = {
        //         ...user,
        //         ...(matchingCustomer && { stripeCustomer: matchingCustomer }), // Merge the matched customer if found
        //       };

        //       return newC;
        //     }
        //   })
        //   .filter(Boolean);

        // setCustomers(mergedUsers);

        // console.log("mergedUsers");
        // console.log(mergedUsers);
      }
    };
    fetch();
  }, [auth.user, router]);

  return (
    <>
      <header className="px-4 py-2">
        <Nav />
      </header>
      <main className="flex justify-center md:bg-primary w-full h-full ">
        <div className="md:max-w-[75%] max-w-full h-full items-center justify-center  w-full px-10 pt-14 bg-[#F9F9F9]">
          <section
            id="admins"
            className="flex flex-col mt-2 items-center   gap-5 justify-center"
          >
            <div className="flex w-full flex-col items-center md:flex-row justify-center gap-7">
              {admins.map((admin) => {
                const ansQ = chats.filter(
                  (chat) =>
                    chat?.answered && chat?.chatUsers.includes(admin?.id)
                );
                const ongoing = chats.filter(
                  (chat) =>
                    !chat?.answered && chat?.chatUsers.includes(admin?.id)
                );
                return (
                  <>
                    <Link
                      href={"/profile"}
                      className="bg-white flex border-t-5 border-b-5 rounded-xl border-primary max-w-[300px] w-full overflow-hidden items-center justify-center shadow-xl   h-auto flex-col"
                    >
                      <div className="pt-[10px] ">
                        {/* <Image
                          src="/juris.svg"
                          alt=""
                          width={132}
                          height={52}
                          className="object-cover rounded-full w-[132px] h-[132px] object-center"
                        /> */}
                        <FaRegUserCircle size={132} className="text-primary" />
                      </div>
                      <h1 className="mt-4 text-[20px] font-[500]">
                        {admin?.fullName}
                      </h1>
                      <p className="text-xs mb-3">{admin?.username}</p>
                      <div className="flex justify-center py-2 items-center gap-4 text-center">
                        <div className="flex justify-center items-center w-full flex-col">
                          <p className="flex justify-center items-center w-full max-w-[100px] text-[16px] font-semibold">
                            Answered Questions
                          </p>
                          <h1 className=" bg-black w-10 h-10 text-white rounded-full justify-center flex items-center">
                            {ansQ.length}
                          </h1>
                        </div>

                        <div className="flex justify-center items-center w-full flex-col">
                          <p className="flex justify-center items-center w-full max-w-[100px] text-[16px] font-semibold">
                            Ongoing Questions
                          </p>
                          <h1 className=" bg-black w-10 h-10 text-white rounded-full justify-center flex items-center">
                            {ongoing.length}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </section>

          <section
            id="summary"
            className="flex items-center flex-wrap lg:flex-nowrap mt-10 gap-4  justify-center"
          >
            <div className="flex items-center hover:text-white hover:bg-primary justify-between w-full max-w-[250px] h-[100px] px-4  bg-white shadow-xl rounded-xl group transition-all duration-700">
              <div className="">
                <h1 className="text-[25px] font-semibold text-primary group-hover:text-white">
                  {totalOngoingQs + totalAnsweredQs}
                </h1>
                <p className="hover:text-white">Questions Asked</p>
              </div>
              <FaQuestion
                size={25}
                className="hover:text-white text-primary "
              />
            </div>

            <div className="flex items-center hover:text-white hover:bg-primary justify-between w-full max-w-[250px] h-[100px] px-4 bg-white shadow-xl rounded-xl group transition-all duration-700">
              <div className="">
                <h1 className="text-[25px] font-semibold text-primary group-hover:text-white">
                  {totalAnsweredQs}
                </h1>
                <p className="hover:text-white">Answered Question</p>
              </div>
              <RiQuestionAnswerLine
                size={25}
                className="hover:text-white text-primary "
              />
            </div>

            <div className="flex items-center hover:text-white hover:bg-primary justify-between w-full max-w-[250px] h-[100px] px-4  bg-white shadow-xl rounded-xl group transition-all duration-700">
              <div className="">
                <h1 className="text-[25px] font-semibold text-primary group-hover:text-white">
                  {customers.length || 0}
                </h1>
                <p className="hover:text-white">Total Customer</p>
              </div>
              <FaPeopleGroup
                size={25}
                className="hover:text-white text-primary "
              />
            </div>

            <div className="flex items-center hover:text-white hover:bg-primary justify-between w-full max-w-[250px] h-[100px] px-4  bg-white shadow-xl rounded-xl group transition-all duration-700">
              <div className="">
                <h1 className="text-[25px] font-semibold text-primary group-hover:text-white">
                  {admins.length || 0}
                </h1>
                <p className="hover:text-white">Staff</p>
              </div>
              <IoIosPeople
                size={25}
                className="hover:text-white text-primary "
              />
            </div>
          </section>

          <section
            id="table"
            className="flex items-center overflow-x-auto  w-full justify-center mt-14 mb-6"
          >
            <TableC customers={customers} />
            {/* <TableC /> */}
          </section>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
