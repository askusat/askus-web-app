"use client";
import React, { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import { FaBars, FaPhone, FaQuestion, FaUserLock, FaUsers } from "react-icons/fa";
import { MdCancel, MdLogin, MdSupportAgent } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { FcAbout } from "react-icons/fc";
import { IoMdHelpCircle } from "react-icons/io";
import { FaRegAddressCard } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const toggleMenu = () => {
//     setOpen((prevOpen) => !prevOpen)
//   };
// }
// const sidenav = () => {
//   const [sidenav, setsidenav] = useState(false);
//   console.log(sidenav)

export default function Nav() {
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
      <Image src="/logo-2.svg" alt="" width={132} height={29} />

      <div className="hidden  lg:flex items-center gap-[46px]">
        <Link href="#" className="text-black hover:text-primary">
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
        <Link href="#" className="text-black hover:text-primary">
          Register
        </Link>
        <Link href="#" className="text-black hover:text-primary">
          Sign In
        </Link>
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
            } lg:hidden fixed place-items-center origin-top left-0 bg-white primary z-30 w-full top-0 flex-col justify-center items-center max-w-[400px] text-black h-screen px-10`}
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
                className=" flex-col overflow-hidden flex z-20 justify-center items-start gap-[46px]"
              >
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                >
                  <Link href="/" className="flex items-center gap-4 text-lg">
                    <FaHome size={24} />
                    <span>Home</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                >
                  <Link href="/" className="flex items-center gap-4 text-lg">
                  <MdSupportAgent size={24} />
                    <span>Chat with Expert</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                >
                  <Link href="/about" className="flex items-center gap-4 text-lg">
                    <FaUsers size={24} />
                    <span>About</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                >
                  <Link href="/contact-us" className="flex items-center gap-4 text-lg">
                    <FaPhone size={24} />
                    <span>Contact Us</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                >
                  <Link href="/faq" className="flex items-center gap-4 text-lg">
                    <FaQuestion size={24} />
                    <span>FAQ</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                >
                  <Link href="/" className="flex items-center gap-4 text-lg">
                    <FaUserLock size={24} />
                    <span>Register</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                >
                  <Link href="/" className="flex items-center gap-4 text-lg">
                    <MdLogin size={24} />
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
