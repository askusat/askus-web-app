"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import {
  FaAngleDown,
  FaBars,
  FaBell,
  FaCheckDouble,
  FaPhone,
  FaQuestion,
  FaUser,
  FaUserLock,
  FaUsers,
} from "react-icons/fa";
import { MdCancel, MdLogin, MdSupportAgent } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import {
  formatDateToDMYY,
  markAllNotificationAsRead,
  markNotificationAsRead,
} from "@/app/utils/helpers";
import { useRouter } from "next/navigation";

export default function Nav() {
  const { user, notifications, setNotifications } = useAuth();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const router = useRouter()

  const toggleMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const [open, setOpen] = useState(false);

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.5,
        ease: [0.12, 1, 0.39, 1],
      },
    },
  };
  const mobileLinkVars = {
    initial: {
      y: "100vh",
      transition: {
        duration: 0.5,
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.9,
      },
    },

    open: {
      transition: {
        staggerChildren: 0.09,
      },
    },
  };

  return (
    <nav className="flex items-center justify-between gap-[46px]">
      <Link href="/">
        <Image
          src="/logo-2.svg"
          alt="logo"
          width={200}
          height={40}
          className="md:w-[117px] md:h-[40px] w-[100px] h-auto"
        />
      </Link>

      <div className="hidden xl:flex items-center gap-[46px] font-semibold">
        <Link href="/" className="text-black hover:text-primary">
          Home
        </Link>
        <Link href="#" className="text-black hover:text-primary">
          Chat With Expert
        </Link>
        <Link href="/about" className="text-black hover:text-primary">
          About Us
        </Link>
        <Link href="/faq" className="text-black hover:text-primary">
          FAQ
        </Link>
        <Link href="/contact-us" className="text-black hover:text-primary">
          Contact us
        </Link>
        {!user ? (
          <>
            <Link href="/signup" className="text-black hover:text-primary">
              Register
            </Link>
            <Link href="/login" className="text-black hover:text-primary">
              Sign In
            </Link>
          </>
        ) : (
          <>
            <Button
              isIconOnly
              className=" bg-transparent"
              onClick={() => {
                setOpen(true);
              }}
            >
              <div className="relative">
                <FaBell size={24} />
                <div className="w-5 h-5 bg-red-600 text-white rounded-full text-xs grid place-items-center absolute -top-2 -right-2">
                  {notifications.length}
                </div>
              </div>
            </Button>
            <ProfileButton />
          </>
        )}

        {openMobileMenu && (
          <div
            className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0 cursor-pointer"
            onClick={toggleMenu}
          ></div>
        )}
      </div>

      <div className="flex items-center gap-3 xl:hidden">
        {user && <Button
          isIconOnly
          className=" bg-transparent -mb-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <div className="relative   w-fit  py-1 px-3">
            <FaBell size={20} className="" />
            <div className="w-[18px] h-[18px] bg-red-600   text-white rounded-full text-[9px] grid place-items-center absolute -top-1 right-1">
              {notifications.length}
            </div>
          </div>
        </Button>}

        <Button
          isIconOnly
          color="primary"
          aria-label="menu-button"
          className=""
          onClick={toggleMenu}
        >
          <FaBars size={24} />
        </Button>

        {open && (
          <div className="">
            <div
              className="fixed bg-cover w-full h-screen z-5  top-0 left-0 bg-black/10"
              onClick={() => {
                setOpen(false);
              }}
            ></div>

            <div
              className={`fixed place-items-center origin-top md:right-10 right-2 bg-white primary z-[99999] w-full top-[12%] flex-col justify-center items-center max-w-[300px] text-black shadow-lg rounded-lg font-normal`}
            >
              <div className="shadow-xl py-3 px-4 text-gray-700j flex items-center justify-between gap-4">
                Notifications ({notifications.length})
                <Button
                  isIconOnly
                  title="mark as read"
                  className="bg-transparent"
                  onClick={() => {
                    markAllNotificationAsRead(user, setNotifications);
                  }}
                >
                  <FaCheckDouble />
                </Button>
              </div>
              <div className="flex flex-col gap-6 py-4 max-h-[350px] overflow-auto px-4">
                {notifications.map((notification) => (
                  <div
                    key={`notfn_${notification?.id}`}
                    className="rounded-lg py-1 px-3 bg-slate-200 cursor-pointer"
                    onClick={() => {
                      markNotificationAsRead(
                        user,
                        notification?.id || 1,
                        notifications,
                        setNotifications
                      );
                      if(notification?.chatId){
                        router.push(`/chat?chatId=${notification?.chatId}`)
                      }
                    }}
                  >
                    <div className="text-xs truncate">
                      {notification?.title}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="truncate text-[10px]">
                        {notification?.message}
                      </p>
                      <div className="text-[9px] text-gray-600 whitespace-nowrap">
                        {formatDateToDMYY(
                          notification?.updatedAt || new Date()
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {openMobileMenu && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${
              openMobileMenu ? "" : ""
            } xl:hidden fixed place-items-center origin-top left-0 bg-white primary z-30 w-full top-0 flex-col justify-center items-center max-w-[400px] text-black h-screen overflow-auto px-4`}
          >
            <div className="flex items-center pt-4 justify-between">
              <div className="flex h-full ">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={132}
                  height={29}
                  className=""
                />
              </div>

              <div className="flex">
                <Button
                  isIconOnly
                  color="primary"
                  aria-label="menu-button"
                  onClick={toggleMenu}
                >
                  <MdCancel size={24} />
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-center w-full pt-10  items-start">
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                className=" flex-col overflow-auto flex z-20 justify-center items-start gap-[30px] w-full"
              >
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                  className="w-full"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-4 text-lg text-black w-full hover:bg-blue-200 py-1 px-3 rounded-lg group hover:text-primary"
                  >
                    <FaHome
                      size={24}
                      className="group-hover:text-primary transition-all duration-300"
                    />
                    <span>Home</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                  className="w-full"
                >
                  <Link
                    href="/#chat"
                    className="flex items-center gap-4 text-lg text-black w-full hover:bg-blue-200 py-1 px-3 rounded-lg group hover:text-primary"
                  >
                    <MdSupportAgent
                      size={24}
                      className="group-hover:text-primary transition-all duration-300"
                    />
                    <span>Chat with Expert</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                  className="w-full"
                >
                  <Link
                    href="/about"
                    className="flex items-center gap-4 text-lg text-black w-full hover:bg-blue-200 py-1 px-3 rounded-lg group hover:text-primary"
                  >
                    <FaUsers
                      size={24}
                      className="group-hover:text-primary transition-all duration-300"
                    />
                    <span>About</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                  className="w-full"
                >
                  <Link
                    href="/contact-us"
                    className="flex items-center gap-4 text-lg text-black w-full hover:bg-blue-200 py-1 px-3 rounded-lg group hover:text-primary"
                  >
                    <FaPhone
                      size={24}
                      className="group-hover:text-primary transition-all duration-300"
                    />
                    <span>Contact Us</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                  className="w-full"
                >
                  <Link
                    href="/faq"
                    className="flex items-center gap-4 text-lg text-black w-full hover:bg-blue-200 py-1 px-3 rounded-lg group hover:text-primary"
                  >
                    <FaQuestion
                      size={24}
                      className="group-hover:text-primary transition-all duration-300"
                    />
                    <span>FAQ</span>
                  </Link>
                </motion.div>
                {!user ? (
                  <>
                    <motion.div
                      variants={mobileLinkVars}
                      initial="initial"
                      animate="open"
                      className="w-full"
                    >
                      <Link
                        href="/signup"
                        className="flex items-center gap-4 text-lg text-black w-full hover:bg-blue-200 py-1 px-3 rounded-lg group hover:text-primary"
                      >
                        <FaUserLock
                          size={24}
                          className="group-hover:text-primary transition-all duration-300"
                        />
                        <span>Register</span>
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={mobileLinkVars}
                      initial="initial"
                      animate="open"
                      className="w-full"
                    >
                      <Link
                        href="/login"
                        className="flex items-center gap-4 text-lg text-black w-full hover:bg-blue-200 py-1 px-3 rounded-lg group hover:text-primary"
                      >
                        <MdLogin
                          size={24}
                          className="group-hover:text-primary transition-all duration-300"
                        />
                        <span>Login</span>
                      </Link>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    variants={mobileLinkVars}
                    initial="initial"
                    animate="open"
                    className="w-full"
                  >
                    <div className="py-1 px-3 relative">
                      <ProfileButton toggleMenu={toggleMenu} />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const ProfileButton = ({ toggleMenu }: any) => {
  const { logout } = useAuth();
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          setShow(!show);
        }}
      >
        <Button
          isIconOnly
          color="primary"
          className="pointer-events-none"
          variant="faded"
          aria-label="user"
        >
          <FaUser />
        </Button>
        <FaAngleDown />
      </div>

      {show && (
        <div className="lg:absolute w-fit top-full right-0 min-w-[100px] z-[9999999999] flex justify-end py-3 px-4 shadow-lg bg-whiterounded-lg">
          <div className="flex flex-col gap-3">
            <Link
              href="/profile"
              className="text-black hover:text-primary"
              onClick={() => {
                setShow(false);
                toggleMenu();
              }}
            >
              Profile
            </Link>
            <Link
              href="/"
              onClick={() => {
                logout();
                setShow(false);
                toggleMenu && toggleMenu();
              }}
              className="text-black hover:text-primary"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
