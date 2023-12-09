import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import ChatBot from "./components/chatBot";
import HowItWorks from "./components/home/howItWorks";
import Spacer from "./components/spacer";
import SampleQuestionsSlider from "./components/home/sampleQuestionsSlider";
import Nav from "./components/layout/nav";

const testimonials = [
  {
    title: "Best site I’ve ever been on",
    desc: "Very knowledgeable about any question, and they answer within minutes.",
    user: "Kelvin",
  },
  {
    title: "Best site I’ve ever been on",
    desc: "Very knowledgeable about any question, and they answer within minutes.",
    user: "Kelvin",
  },
  {
    title: "Best site I’ve ever been on",
    desc: "Very knowledgeable about any question, and they answer within minutes.",
    user: "Kelvin",
  },
  {
    title: "Best site I’ve ever been on",
    desc: "Very knowledgeable about any question, and they answer within minutes.",
    user: "Kelvin",
  },
  {
    title: "Best site I’ve ever been on",
    desc: "Very knowledgeable about any question, and they answer within minutes.",
    user: "Kelvin",
  },
  {
    title: "Best site I’ve ever been on",
    desc: "Very knowledgeable about any question, and they answer within minutes.",
    user: "Kelvin",
  },
  {
    title: "Best site I’ve ever been on",
    desc: "Very knowledgeable about any question, and they answer within minutes.",
    user: "Kelvin",
  },
  {
    title: "Best site I’ve ever been on",
    desc: "Very knowledgeable about any question, and they answer within minutes.",
    user: "Kelvin",
  },
];

export default function Home() {
  return (
    <>
      <header className="h-screen w-full bg-[url(/bg-2.svg)] bg-cover bg-no-repeat bg-center py-[62px] px-[60px]">
        <Nav />

        <div className="flex gap-4 justify-between">
          <div className="flex-[4]">
            <div className="pt-[92px]">
              <h1 className="font-PoppinsBold text-[58px] font-bold leading-[72px] tracking-[1px]">
                Transforming Legal Services
              </h1>
              <p className="mt-[28px] mb-[15px] w-full max-w-[600px] tracking-[1px] text-[20px]">
                Gain round-the-clock access to thousands of Expert Lawyers,
                available wherever and whenever you need assistance.
              </p>
              <Button
                className="mt-3 bg-primary text-white rounded-[10px]"
                size="lg"
              >
                Get started
              </Button>

              <div className="mt-20">
                <Image
                  src="/review.svg"
                  alt=""
                  width={616}
                  height={104}
                  className="w-[300px] h-auto"
                />
              </div>
            </div>
          </div>
          <div className="flex-[3]">
            <ChatBot />
          </div>
        </div>
      </header>

      <main className="">
        <Spacer />
        <HowItWorks />

        <Spacer />

        <section
          id="sample-question"
          className="bg-[url(/sample-questions-bg.svg)] bg-no-repeat bg-cover bg-center w-full flex items-center justify-between gap-4 px-[60px]"
        >
          <div className="w-[40%]">
            <h1 className="font-PoppinsBold text-[58px] font-bold leading-[60px] tracking-[1px] max-w-[500px]">
              Ask us anytime anytime!
            </h1>
            <p className="mt-[28px] mb-[15px] w-full max-w-[500px] tracking-[1px] text-[20px]">
              The Experts at AskUs are ready to answer your questions, day or
              night.
            </p>
            <Button
              className="mt-3 bg-primary text-white rounded-[10px]"
              size="lg"
            >
              Get started
            </Button>
          </div>

          <SampleQuestionsSlider />
        </section>

        <Spacer />

        <section id="services">
          <div className="flex flex-col items-center">
            <h2 className="font-PoppinsBold text-[60px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase">
              Testimonials
            </h2>
            <h3 className="text-[48px] font-bold -mt-11">
              What our clients say
            </h3>
            <div className="h-1 bg-primary min-w-[100px]"></div>
          </div>

          <div className="mt-12"></div>

          <div className="flex justify-center">
            <div className="flex flex-col gap-12">
              <div className="h-[135px] flex items-center">
                <h2 className="font-PoppinsBold text-[60px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase mr-7">
                  01
                </h2>
                <Image
                  src={"circle-check.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className=""
                />
                <div className="min-w-[210px] border border-dashed"></div>
                <div className="w-4 h-4 rounded-full -mr-[10px] bg-primary relative z-10"></div>
              </div>

              <div className="h-[135px] flex flex-col justify-center">
                <h3 className="font-PoppinsBold font-bold text-[28px] text-primary ">
                  Available 24/7
                </h3>
                <p className="mt-2 text-xl max-w-[400px]">
                  Available 24/7 for your convenience! Get in touch anytime, day
                  or night, for swift and reliable assistance.
                </p>
              </div>

              <div className="h-[135px] flex items-center">
                <h2 className="font-PoppinsBold text-[60px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase mr-7">
                  01
                </h2>
                <Image
                  src={"circle-check.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className=""
                />
                <div className="min-w-[210px] border border-dashed"></div>
                <div className="w-4 h-4 rounded-full -mr-[10px] bg-primary relative z-10"></div>
              </div>

              <div className="h-[135px] flex flex-col justify-center">
                <h3 className="font-PoppinsBold font-bold text-[28px] text-primary ">
                  Available 24/7
                </h3>
                <p className="mt-2 text-xl max-w-[400px]">
                  Available 24/7 for your convenience! Get in touch anytime, day
                  or night, for swift and reliable assistance.
                </p>
              </div>

              <div className="h-[135px] flex items-center">
                <h2 className="font-PoppinsBold text-[60px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase mr-7">
                  01
                </h2>
                <Image
                  src={"circle-check.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className=""
                />
                <div className="min-w-[210px] border border-dashed"></div>
                <div className="w-4 h-4 rounded-full -mr-[10px] bg-primary relative z-10"></div>
              </div>
            </div>
            <div className="border border-dashed h-[calc(870px-130px)] mt-[65px]"></div>
            <div className="flex flex-col gap-12">
              <div className="h-[135px] flex flex-col justify-center px-8">
                <h3 className="font-PoppinsBold font-bold text-[28px] text-primary">
                  Expert lawyers
                </h3>
                <p className="mt-2 text-xl max-w-[400px]">
                  We have high quality verified expert lawyers ready to help
                  you.
                </p>
              </div>

              <div className="h-[135px] flex items-center">
                <div className="w-4 h-4 rounded-full -ml-[10px] bg-primary relative z-10"></div>
                <div className="min-w-[210px] border border-dashed"></div>
                <Image
                  src={"circle-check.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className=""
                />
                <h2 className="font-PoppinsBold text-[60px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase ml-7">
                  02
                </h2>
              </div>

              <div className="h-[135px] flex flex-col justify-center px-8">
                <h3 className="font-PoppinsBold font-bold text-[28px] text-primary">
                  Expert lawyers
                </h3>
                <p className="mt-2 text-xl max-w-[400px]">
                  We have high quality verified expert lawyers ready to help
                  you.
                </p>
              </div>

              <div className="h-[135px] flex items-center">
                <div className="w-4 h-4 rounded-full -ml-[10px] bg-primary relative z-10"></div>
                <div className="min-w-[210px] border border-dashed"></div>
                <Image
                  src={"circle-check.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className=""
                />
                <h2 className="font-PoppinsBold text-[60px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase ml-7">
                  02
                </h2>
              </div>

              <div className="h-[135px] flex flex-col justify-center px-8">
                <h3 className="font-PoppinsBold font-bold text-[28px] text-primary">
                  Expert lawyers
                </h3>
                <p className="mt-2 text-xl max-w-[400px]">
                  We have high quality verified expert lawyers ready to help
                  you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Spacer />

        <section
          id="cta"
          className="w-full h-[400px] bg-[url(/get-started-bg.svg)] bg-cover bg-center flex flex-col items-center justify-center gap-8 text-white"
        >
          <h2 className="text-[48px] font-PoppinsBold font-bold ">
            Start your chat with an expert now
          </h2>
          <p className="max-w-[544px] text-[20px] text-center">
            With both chat and telephone options the power is in your hands, get
            the answers you need now.
          </p>
          <Button
            className="mt-3 text-primary bg-white rounded-[10px] border-none"
            size="lg"
          >
            Get started
          </Button>
        </section>

        <Spacer />

        <section id="testimonials">
          <div className="flex flex-col items-center">
            <h2 className="font-PoppinsBold text-[60px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase">
              Testimonials
            </h2>
            <h3 className="text-[48px] font-bold -mt-11">
              What our clients say
            </h3>
            <div className="h-1 bg-primary min-w-[100px]"></div>
          </div>

          <div className="mt-[100px] lg:grid grid-cols-4 gap-8 px-[60px]">
            {testimonials.map((testomial, index) => (
              <div
                key={`testimonials_t-${index}`}
                className="shadow-[0px_0px_17.7px_3px_rgba(0,_0,_0,_0.09)] rounded-3xl w-[300px] h-[200px] bg-white px-[14px] py-[18px]"
              >
                <div className="flex items-center gap-3">
                  <div className="">
                    <Image
                      src="/FaGrinStars.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="w-[24px] h-auto"
                    />
                  </div>
                  <div className="font-bold">{testomial.user}</div>
                </div>

                <h4 className="font-bold font-PoppinsBold text-[17px] text-center mt-6">
                  {testomial.title}
                </h4>
                <div className="flex items-end">
                  <div className="">
                    <p className="text-center">{testomial.desc}</p>
                  </div>

                  <Image
                    src="/FaQuoteLeft.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="w-[100px] h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <Spacer />
      </main>
    </>
  );
}
