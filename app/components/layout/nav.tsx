'use client'
import React, { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
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
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const toggleMenu = () => {
    setOpenMobileMenu(!openMobileMenu)
  }
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0]
      }
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.5,
        ease: [0.12, 1, 0.39, 1]
      }
    },
  }
const mobileLinkVars={
  initial:{
    y:"100vh",
    transition:{
       duration:0.5,
    },
  }, 
  open:{
    y:0,
    transition:{
      duration:0.7,
    }
  }
}
  const containerVars = {
    initial: {
      transition: { 
        staggerChildren: 0.9 
      }
    },
  
    open: {      
      transition: {
        staggerChildren: 0.09
      }
    },
  }
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

      <Button isIconOnly color="primary" aria-label="menu-button" className="lg:hidden" onClick={toggleMenu}>
        <FaBars size={24} />
      </Button>

      {openMobileMenu && <div className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0 cursor-pointer" onClick={toggleMenu} >
      </div>}

      <AnimatePresence>
        {openMobileMenu && <motion.div
          variants={menuVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`${openMobileMenu ? '' : ''} lg:hidden fixed place-items-center origin-top left-0 bg-white primary z-30 w-full top-0 flex-col justify-center items-center max-w-[400px] text-black h-screen px-10`}>

          <div className="flex items-center pt-4 justify-between">
            <div className="flex h-full ">
              <Image src="/logo.svg" alt="" width={132} height={29} classname="" />
            </div>

            <div className="flex" >
              <Button isIconOnly color="primary" aria-label="menu-button" onClick={toggleMenu}>
                <MdCancel size={24} />
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full pt-10  items-start">
            <motion.div
            variant={containerVars} 
              initial="initial"
              animate="open"
            className=" flex-col overflow-hidden flex z-20 justify-center items-start gap-[46px]">
              <div className="flex overflow-hidden  items-start text-xl gap-4">
                <motion.p
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                className="flex"><FaHome size={30} />
                </motion.p>
                <motion.Link 
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                href="#" className="text-black flex font-normal font-PoppinsRegular pt-1 text-[20px] hover:text-primary ">
                  Home
                </motion.Link>
              </div>

              <div className="flex items-start text-xl gap-4">
                <motion.p
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                className="flex"><GrUserExpert size={30} /></motion.p>
                <motion.Link
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                href="#" className="text-black flex font-normal font-PoppinsRegular pt-1 text-[20px] hover:text-primary ">
                  Chat With Expert
                </motion.Link>
              </div>
              <div className="flex items-start text-xl gap-4">
                <motion.p
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                className="flex"><IoMdHelpCircle size={30} /></motion.p>
                <motion.Link 
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                href="#" className="text-black flex font-normal font-PoppinsRegular pt-1 text-[20px] hover:text-primary ">
                  Help
                </motion.Link>
              </div>
              <div className="flex items-start text-xl gap-4">
                <motion.p 
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                className="flex"><FaRegAddressCard size={30} /></motion.p>
                <motion.Link 
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                href="#" className="text-black flex font-normal font-PoppinsRegular pt-1 text-[20px] hover:text-primary ">
                  Register
                </motion.Link>
              </div>
              <div className="flex items-start text-xl gap-4">
                <motion.p 
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                className="flex"><FaSignInAlt size={30} /></motion.p>
                <motion.Link 
                  variants={mobileLinkVars}
                  initial="initial"
                  animate="open"
                href="#" className="text-black flex font-normal flexfont-PoppinsRegular pt-1 text-[20px] hover:text-primary ">
                  Sign In
                </motion.Link>
              </div>
         
            </motion.div>
          </div>


        </motion.div>}
      </AnimatePresence>
    </nav>

  );
}
