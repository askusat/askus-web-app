import React, { useState } from "react";
import Layout from "../components/layout";
import ContactForm from "../components/contactus/contact";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Button, Link } from "@nextui-org/react";

export default function ContactUsPage() {
  return (
    <div className="mb-20">
      <Layout />

      <div className="lg:flex sm:flex-col lg:flex-row justify-center md:items-center md:flex gap-20 w-full h-full pt-8 md:px-8 px-4">
        <ContactForm />

        <div className="flex mt-12 md:mt-0 items-center flex-col justify-center w-full max-w-[600px] ">
          <div className="flex sm:items-center lg:items-start    w-full  flex-col">
            <h1 className="text-primary sm:pt-10 lg:pt-0 font-bold font-PoppinsRegular text-[20px] hidden lg:block">
              Contact Us
            </h1>
            <h2 className="text-bold  text-[30px] font-PoppinsSemiBold text-center lg:text-start">
              How can we Help?
            </h2>
            <p className="w-full md:max-w-[500px] text-center lg:text-start">
            {`We're here to assist you with any questions, inquiries, or feedback you may have. Our team is dedicated to providing you with the best possible support experience. We look forward to hearing from you!`}
            </p>
          </div>

          <div className="w-full items-center mb-10  flex justify-center  mt-16 ">
            <div className="md:space-y-0 space-y-10 w-full rounded-lg">
              <div className="flex justify-center items-center lg:items-start flex-col">
                <IoMdMail size={30} className="text-primary " />
                <h1 className="font-bold text-[15px] mb-4 mt-6">Email</h1>
                <Link href="mailto:contact@Askus.com" className="text-primary">contact@askusat.co.uk</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
