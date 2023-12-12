import React, { useState } from 'react'
import Layout from '../components/layout'
import ContactForm from '../components/contactus/contact';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Button} from "@nextui-org/react";

export default function ContactUsPage() {
  return (
    <div className="">
      <Layout />

      <div className='lg:flex sm:flex-col lg:flex-row justify-center md:items-center md:flex gap-20 w-full h-full pt-8 px-8'>

        {/* left side */}

        <ContactForm />

        {/* right side */}
        <div className="flex  items-center flex-col justify-center w-full max-w-[600px] ">
          <div className="flex sm:items-center lg:items-start    w-full  flex-col">
            <h1 className="text-primary sm:pt-10 lg:pt-0 font-bold font-PoppinsRegular text-[20px] ">Contact Us</h1>
            <h2 className="text-bold  text-[30px] font-PoppinsSemiBold ">How can we Help?</h2>
            <p className="sm:w-full md:w-[400px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta ipsam pariatur quibusdam</p>
          </div>

          <div className="w-full items-center mb-10  flex justify-center  mt-16 ">
            <div className="md:h-[200px] md:flex sm:h-full md:space-y-0 space-y-10 sm:flex-col md:flex-row justify-around items-center w-full rounded-lg ">
              <div className="flex justify-center items-center  flex-col">
                <FaLocationDot size={30} className="text-primary " />
                <h1 className='font-bold text-[15px] mb-4 mt-6'>Headquarter</h1>
                <p className="text-gray-600">Houston, TX</p>
              </div>

              <div className="flex justify-center items-center  flex-col">
                <IoMdMail size={30} className="text-primary " />
                <h1 className='font-bold text-[15px] mb-4 mt-6'>Email</h1>
                <p className="text-gray-600">Contact@Askus.com</p>
              </div>

              <div className="flex justify-center items-center  flex-col">
                <IoCall size={30} className="text-blue-800 " />
                <h1 className='font-bold text-[15px] mb-4 mt-6'>Phone</h1>
                <p className="text-gray-600">08112659304</p>
              </div>

            </div>
          </div>

          {/* <div className="flex w-full gap-6 mt-20 flex-col ">
            <div className="flex  px-6 justify-between rounded-lg h-[70px] w-full border-2 shadow-lg bg-white items-center ">
              <h1 className='font-semibold'> Job Seeker</h1>
              <Button className="h-8 w-8 text-white text-[25px] flex cursor-pointer items-center justify-center bg-primary rounded-full"> +</Button>
            </div>
            <div className="flex px-6 justify-between rounded-lg h-[70px] w-full border-2 shadow-lg bg-white items-center ">
              <h1 className='font-semibold'>Talent Consulting</h1>
              <Button className="h-8 w-8 text-white text-[25px] flex cursor-pointer items-center justify-center bg-primary rounded-full"> +</Button>
            </div>
            <div className="flex px-6 justify-between rounded-lg h-[70px] w-full border-2 shadow-lg bg-white items-center ">
              <h1 className='font-semibold'> Workforce Management</h1>
              <Button className="h-8 w-8 text-white text-[25px] flex cursor-pointer items-center justify-center bg-primary rounded-full"> +</Button>
            </div>
          </div> */}

        </div>
       
      </div>
     
    </div>
  )
}
