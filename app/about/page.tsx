import React from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import Nav from "../components/layout/nav";
import Link from "next/link";

export const metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <div className="">
      <div className="py-3 md:px-8 px-4">
        <Nav />
      </div>
      <div className="flex flex-col mb-10 justify-center items-center">
        <div
          className=" flex items-center flex-col  justify-center bg-cover bg-no-repeat bg-center lg:w-full h-screen w-full bg-gradient-to-br from-red-400 via-blue-700 to-transparent relative text-white"
          style={{
            backgroundImage:
                "linear-gradient(45deg, rgba(0, 112, 240, 0.75), rgba(0, 112, 240, 0.6), rgba(0, 112, 240, 0.45), rgba(0, 112, 240, 0.3), rgba(0, 112, 240, 0.15)), url(team2.jpg)",
          }}
        >
          <div className="text-white lg:text-[60px] text-[26px] text-center w-full font-MontserratBold">
            <h1 className="max-w-[600px] mx-auto">
              Revolutionizing the manner in which individuals seek expert help
            </h1>
          </div>
          <Link href="#aboutus">
            <Button
              aria-label="dropdown"
              isIconOnly
              variant="flat"
              className="flex items-center justify-center mt-20 bg-none border-2 border-white  z-10 rounded-full"
            >
              <FaAngleDown
                color="white"
                className="w-full h-auto blue lg:text-[50px] text-[28px]"
              />
            </Button>
          </Link>
        </div>

        <div
          className="flex md:px-20 items-center mt-20 mb-10 overflow-hidden justify-center"
          id="aboutus"
        >
          <div className="flex flex-col justify-start items-center bg-primary h-auto  text-white md:px-10 pt-8 w-full md:h-[400px] lg:w-auto max-w-[500px] px-4">
            <h1 className="text-[40px] border-b-2 font-bold  border-white border-1  border-l-0 border-r-0 border-t-0">
              Why AskUs
            </h1>
            <h1 className="pt-6 text-[18px]">
              Askus is a platform that connects customers with experts 24/7
              currently focused on legal questions. You can speak to an expert
              lawyer in minutes with all the quality and assurance you would
              expect from a professional but with the convenience of asking from
              anywhere, anytime.
            </h1>
            <Link href={"/chat"}>
              <Button
                aria-label="Get started button"
                className=" bg-white mt-10 mb-10 text-primary rounded-[10px]"
                size="lg"
              >
                Get Started
              </Button>
            </Link>
          </div>

          <div className="hidden lg:flex">
            <Image
              src="/happy.jpg"
              alt="logo"
              width={500}
              height={400}
              className=" w-[full] max-w-[500px] h-[400px] object-center object-cover "
            />
          </div>
        </div>

        <div className="flex justify-center flex-col  item-center md:px-20 ">
          <div className="flex flex-col justify-center item-center px-6 md:px-0">
            <h1 className="text-[40px] leading-[40px] text-center font-PoppinsBold">
              Our Services
            </h1>
            <p className="text-[18px] mt-4 font-PoppinsRegular text-center md:text-start">
              These principles act as guiding principles defining our identity,
              our operational methodologies, and our current areas of focus.
            </p>
          </div>
          <div className="flex items-center gap-6 flex-wrap mt-10 justify-center">
            <div className="bg-primary mx-3 md:mx-0 w-full max-w-[355px] lg:hover:scale-110 duration-300 flex-col px-6 h-[250px] text-white flex items-center justify-center rounded-xl ">
              <h1 className="text-[30px] border-b-1 font-PoppinsBold ">
                Expert lawyers
              </h1>
              <p className="text-[18px] mt-2 font-[500] text-center">
                We have high quality verified expert lawyers ready to help you.
              </p>
            </div>

            <div className="bg-none mx-4 md:mx-0 w-auto h-auto flex items-center justify-center lg:hover:scale-110 duration-300  rounded-xl ">
              <Image
                src="/wee.jpg"
                alt="logo"
                width={350}
                height={330}
                className="  rounded-xl "
              />
            </div>

            <div className="bg-primary mx-3 md:mx-0 w-full max-w-[355px] lg:hover:scale-110 duration-300 flex-col px-6 h-[250px] text-white flex items-center justify-center rounded-xl ">
              <h1 className="text-[30px] border-b-1 font-PoppinsBold ">
                Available 24/7
              </h1>
              <p className="text-[18px] mt-2 font-[500] text-center">
                Available 24/7 for your convenience! Get in touch anytime, day
                or night, for swift and reliable assistance..
              </p>
            </div>

            <div className="bg-none mx-4 md:mx-0 w-auto h-auto flex items-center justify-center lg:hover:scale-110 duration-300 rounded-xl ">
              <Image
                src="/fast.jpg"
                alt="logo"
                width={350}
                height={330}
                className="  rounded-xl "
              />
            </div>

            <div className="bg-primary mx-3 md:mx-0 w-full max-w-[355px] lg:hover:scale-110 duration-300 flex-col px-6 h-[250px] text-white flex items-center justify-center rounded-xl ">
              <h1 className="text-[30px] border-b-1 font-PoppinsBold text-center">
                Fast and reliable
              </h1>
              <p className="text-[18px] mt-2 font-[500] text-center">
                Our service is fast and reliable, you can speak to an expert in
                minutes rather than waiting days or weeks for an appointment.
              </p>
            </div>
          </div>
        </div>

        <section
          id="cta"
          className="w-full h-[400px] bg-[url(/get-started-bg.png)] mt-10 bg-cover  bg-center flex flex-col items-center justify-center lg:gap-8 gap-4 text-white px-4"
        >
          <h2 className="lg:text-[48px] md:text-[32px] text-[26px] font-PoppinsBold font-bold text-center md:text-start ">
            Our Mission
          </h2>
          <p className="lg:max-w-[544px] max-w-[344px] lg:text-[20px] text-[16px] text-center">
            Our mission is to try to bring expert help to those who need it,
            when they need it for a reasonable cost.
          </p>
          <Link href={"/chat"}>
            <Button
              aria-label="Get started button"
              className="mt-3 text-primary bg-white rounded-[10px] border-none"
              size="lg"
            >
              Get started
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
