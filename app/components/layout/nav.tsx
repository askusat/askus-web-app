"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import {
  FaAngleDown,
  FaBars,
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

export default function Nav() {
  const { user } = useAuth();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };
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
    <nav className="flex items-center justify-between gap-[46px] font-semibold">
      <Link href="/">
        <Image src="/logo-2.svg" alt="logo" width={200} height={40} />
      </Link>

      <div className="hidden  lg:flex items-center gap-[46px]">
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
          <ProfileButton />
        )}
      </div>

      <Button
        isIconOnly
        color="primary"
        aria-label="menu-button"
        className="lg:hidden"
        onClick={toggleMenu}
      >
        <FaBars size={24} />
      </Button>

      {openMobileMenu && (
        <div
          className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0 cursor-pointer"
          onClick={toggleMenu}
        ></div>
      )}

      <AnimatePresence>
        {openMobileMenu && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${
              openMobileMenu ? "" : ""
            } lg:hidden fixed place-items-center origin-top left-0 bg-white primary z-30 w-full top-0 flex-col justify-center items-center max-w-[400px] text-black h-screen px-4`}
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
                className=" flex-col overflow-hidden flex z-20 justify-center items-start gap-[30px] w-full"
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const ProfileButton = () => {
  const { logout } = useAuth()
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <Button isIconOnly color="primary" className="pointer-events-none" variant="faded" aria-label="user">
          <FaUser />
        </Button>
        <FaAngleDown />
      </div>

      {show && <div className="absolute top-full right-0 min-w-[100px] z-50 flex justify-end py-3 px-4 shadow-lg bg-white rounded-lg">
        <div className="flex flex-col gap-3">
          <Link href="/profile" className="text-black hover:text-primary">
            Profile
          </Link>
          <Link href="#logout" onClick={() => logout()} className="text-black hover:text-primary">
            Logout
          </Link>
        </div>
      </div>}
    </div>
  );
};
