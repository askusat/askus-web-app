"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
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
import { User } from "@/types";
// import CreateChat from "../components/chat/createChat";

type User2 = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  authUserId: string;
  email: string;
  fullName: string;
  isSubscribed?: boolean;
  credit: number;
  creditExpiresOn: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  isAdmin?: boolean;
  userProfilePicture?: string;
  chatsJoined: number[];
  username: string;
  // [key: string]: any;
};

export interface Customers extends User2 {
  stripeCustomers: Stripe.Customer[];
}

const AdminDashboard = () => {
  const auth = useAuth();
  const router = useRouter();
  const [totalOngoingQs, setTotalOngoingQs] = useState<number>(0);
  const [totalAnsweredQs, setTotalAnsweredQs] = useState<number>(0);
  // const [ongoingQs, setOngoingQs] = useState<number>(0);
  // const [answeredQs, setAnsweredQs] = useState<number>(0);
  const [customers, setCustomers] = useState<Customers[]>([]);

  // get users questions history
  useEffect(() => {
    const fetch = async () => {
      if (!auth.user) return;
      if (!auth.user.isAdmin) {
        router.replace("/profile");
      }

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

      // const { count: answeredCount } = await supabase
      //   .from("chats")
      //   .select("*", { count: "exact", head: true })
      //   .eq("userId", auth.user.id)
      //   .eq("answered", true);
      // setAnsweredQs(answeredCount || 0);

      // const { count: ongoingCount } = await supabase
      //   .from("chats")
      //   .select("*", { count: "exact", head: true })
      //   .eq("userId", auth.user.id)
      //   .eq("answered", false);
      // setOngoingQs(ongoingCount || 0);

      const { data, error } = await supabase
        .from("users")
        .select()
        // .eq("isAdmin", false)
        .order("updatedAt", { ascending: false });

      if (!error) {
        const customersRes = await axios.post(`/api/stripe`, {
          route: "get_customers",
        });

        const supabaseUsers: User[] | null = data;
        const stripeCustomers = customersRes.data?.customers;

        const mergedUsers: Customers[] = supabaseUsers?.map((user: User) => {
          const matchingCustomer = stripeCustomers?.find(
            (customer: Stripe.Customer) => customer.email === user?.email
          );

          if (matchingCustomer) {
            const newC = {
              ...user,
              ...(matchingCustomer && { stripeCustomer: matchingCustomer }), // Merge the matched customer if found
            };

            return newC;
          }
        }).filter(Boolean);

        // console.log("supabaseUsers: ");
        // console.log(supabaseUsers);

        // console.log("stripeCustomers: ");
        // console.log(stripeCustomers);

        // console.log("mergedUsers: ");
        // console.log(mergedUsers);

        setCustomers(mergedUsers)
      }
    };
    fetch();
  }, [auth.user, router]);

  return (
    <>
      {/* <CreateChat /> */}
      <div className="px-4 py-2">
        <Nav />
      </div>
      <div className="flex justify-center md:bg-primary w-full h-full ">
        {/* Left Side */}
        <div className="max-w-[25%] hidden  lg:flex flex-col items-center  lg:items-center rounded-md w-full mb-[80px] h-screen     bg-primary">
          <Image
            src="/footer.svg"
            alt=""
            width={132}
            height={29}
            className="pt-[30px]"
          />

          <div className="flex flex-col w-full h-full md:pl-6 lg:pl-0  items-center">
            <div className="flex px-2 py-2 justify-center  hover:bg-white mt-14 w-full cursor-pointer">
              <div className=" flex items-center justify-center rounded-lg w-full hover:bg-white hover:text-primary gap-6  text-white">
                <FaHome size={20} />
                <h1 className="text-[20px] hidden lg:flex font-semibold">
                  Dashboard
                </h1>
              </div>
            </div>

            {/* <div className="flex px-2 py-2 rounded-s-sm hover:bg-white mt-14 w-full cursor-pointer">
            <div className=" flex items-center rounded-lg w-full hover:bg-white hover:text-primary gap-6 justify-center text-white">
              <BsFillPeopleFill size={20} />
              <h1 className="text-[20px] hidden lg:flex font-semibold">
                Customer
              </h1>
            </div>
          </div> */}

            {/* <div className="flex px-2 py-2  rounded-md hover:bg-white mt-14 w-full">
            <div className=" flex items-center rounded-lg w-full hover:bg-white hover:text-primary gap-6  justify-center text-white">
              <FaPeopleGroup size={25} className=0" />
              <h1 className="text-[20px] hidden lg:flex font-semibold">
                Staff
              </h1>
            </div>
          </div> */}

            <Link
              href={"/chat"}
              className="flex px-2 py-2 rounded-s-sm hover:bg-white mt-14 w-full"
            >
              <div className=" flex items-center rounded-lg w-full hover:bg-white hover:text-primary gap-6 justify-center text-white">
                <AiFillMessage size={20} />
                <h1 className="text-[20px] hidden lg:flex font-semibold">
                  Message
                </h1>
              </div>
            </Link>
          </div>
        </div>
        {/* Right Side */}
        <div className="md:max-w-[75%] max-w-full h-full items-center justify-center  w-full px-10 pt-14 bg-[#F9F9F9]">
          <div className="flex flex-col mt-2 items-center   gap-5 justify-center">
            {/* <h1 className="text-[30px] font-bold">The Admins</h1> */}
            <div className="flex w-full flex-col items-center md:flex-row justify-center gap-7">
              <div className="bg-white flex border-t-5 border-b-5 rounded-xl border-primary max-w-[300px] w-full overflow-hidden items-center justify-center shadow-xl   h-auto flex-col">
                <div className="pt-[10px] ">
                  <Image
                    src="/juris.svg"
                    alt=""
                    width={132}
                    height={52}
                    className="object-cover rounded-full w-[132px] h-[132px] object-center"
                  />
                </div>
                <h1 className="mt-4 mb-3 text-[20px] font-[500]">
                  Paul Innocent
                </h1>
                <div className="flex justify-center py-2 items-center gap-4 text-center">
                  <div className="flex justify-center items-center w-full flex-col">
                    <p className="flex justify-center items-center w-full max-w-[100px] text-[16px] font-semibold">
                      Answered Questions
                    </p>
                    <h1 className=" bg-black w-10 h-10 text-white rounded-full justify-center flex items-center">
                      30
                    </h1>
                  </div>

                  <div className="flex justify-center items-center w-full flex-col">
                    <p className="flex justify-center items-center w-full max-w-[100px] text-[16px] font-semibold">
                      Ongoing Questions
                    </p>
                    <h1 className=" bg-black w-10 h-10 text-white rounded-full justify-center flex items-center">
                      30
                    </h1>
                  </div>
                </div>
              </div>

              <div className="bg-white flex border-t-5 border-b-5 rounded-xl border-primary max-w-[300px] w-full overflow-hidden items-center justify-center shadow-xl   h-auto flex-col">
                <div className="pt-[10px] ">
                  <Image
                    src="/juris.svg"
                    alt=""
                    width={132}
                    height={52}
                    className="object-cover rounded-full w-[132px] h-[132px] object-center"
                  />
                </div>
                <h1 className="mt-4 mb-3 text-[20px] font-[500]">
                  Paul Innocent
                </h1>
                <div className="flex justify-center py-2 items-center gap-4 text-center">
                  <div className="flex justify-center items-center w-full flex-col">
                    <p className="flex justify-center items-center w-full max-w-[100px] text-[16px] font-semibold">
                      Answered Questions
                    </p>
                    <h1 className=" bg-black w-10 h-10 text-white rounded-full justify-center flex items-center">
                      30
                    </h1>
                  </div>

                  <div className="flex justify-center items-center w-full flex-col">
                    <p className="flex justify-center items-center w-full max-w-[100px] text-[16px] font-semibold">
                      Ongoing Questions
                    </p>
                    <h1 className=" bg-black w-10 h-10 text-white rounded-full justify-center flex items-center">
                      30
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* The Texxt */}
          <div className="flex items-center flex-wrap lg:flex-nowrap mt-10 gap-4  justify-center">
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
                  2
                </h1>
                <p className="hover:text-white">Staff</p>
              </div>
              <IoIosPeople
                size={25}
                className="hover:text-white text-primary "
              />
            </div>
          </div>

          <div className="flex items-center overflow-x-auto  w-full justify-center mt-14 mb-6">
            <TableC customers={customers} />
            {/* <TableC /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
