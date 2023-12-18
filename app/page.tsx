import { Button } from "@nextui-org/react";
import Image from "next/image";
import ChatBot from "./components/chatBot";
import HowItWorks from "./components/home/howItWorks";
import Spacer from "./components/spacer";
import SampleQuestionsSlider from "./components/home/sampleQuestionsSlider";
import Nav from "./components/layout/nav";
import AnimText from "./components/home/AnimText";
// import CreateChat from "./components/chat/createChat";

const testimonials = [
  {
    title: "Best site I’ve ever been on",
    desc: "Very knowledgeable about any question, and they answer within minutes.",
    user: "Kelvin",
  },
  {
    title: "Fast & Reliable",
    desc: "the service provided by AskUs is quick and efficient with excellent knowledge and helpful insights.",
    user: "JL",
  },
  {
    title: "Trusted & Fast Response",
    desc: "I had a trust issue that I needed to talk to someone about urgently. The expert I spoke to responded in minutes and provided clear and detailed answers to all of my questions even when I had multiple follow up queries.",
    user: "PS",
  },
  {
    title: "Efficient Service",
    desc: "This is an amazing service, I have asked multiple questions and have saved thousands in legal fees whilst receiving a far more convenient service. I have been able to talk to a lawyer at the office and on my sofa or even in bed at home. I cannot recommend AskUs more highly",
    user: "IMK",
  },
  {
    title: "Knowledgeable Expert",
    desc: "I had a sensitive query that I needed answers to and I found the expert I spoke to was empathetic, calm and reassuring. They helped me to feel soothed within minutes as a result of both their in depth knowledge and the tone and manner of their responses, I would not hesitate to use this service again",
    user: "BC",
  },
  {
    title: "Timely Response",
    desc: "Fast effective responses and for a low price, what a bargain",
    user: "Junior",
  },
  {
    title: "Best site I’ve ever been on",
    desc: "This service is the best, it is like having a personal lawyer on speed dial. I recommend this service to all my family and friends.",
    user: "JK",
  },
  {
    title: "Best site I’ve ever been on",
    desc: "I thought the service could not be as good as it looks but I have been pleasantly surprised. This is now my go to site whenever I have an issue and I need reliable, answers fast",
    user: "LS",
  },
];

const services = [
  {
    id: "01",
    icon: "circle-check.svg",
    title: "Expert lawyers",
    description:
      "We have high quality verified expert lawyers ready to help you.",
  },
  {
    id: "02",
    icon: "icon2.svg",
    title: "Expert lawyers",
    description:
      "Available 24/7 for your convenience! Get in touch anytime, day or night, for swift and reliable assistance.",
  },
  {
    id: "03",
    icon: "icon3.svg",
    title: "Connect with an expert",
    description:
      "Realise the convenience of connecting to your expert from home saving time and money.",
  },
  {
    id: "04",
    icon: "icon4.svg",
    title: "Tailored answers",
    description:
      "Every answer is bespoke to you and addresses your query without the expensive price tag of in person legal guidance.",
  },
  {
    id: "05",
    icon: "icon5.svg",
    title: "Fast and reliable",
    description:
      "Our service is fast and reliable, you can speak to an expert in minutes rather than waiting days or weeks for an appointment.",
  },
];

export default function Home() {
  return (
    <>
      {/* <CreateChat /> */}
      <header className="h-screen w-full bg-[url(/bg-2.svg)] bg-cover bg-no-repeat bg-center pt-[30px] pb-[62px] lg:px-[60px] px-[5%]">
        <Nav />

        <div className="flex gap-4 justify-between">
          <div className="flex-[4]">
            <div className="pt-[92px]">
              <h1 className="font-PoppinsBold text-[32px] font-semibold md:text-[58px] md:font-bold md:leading-[72px] tracking-[1px]">
                {/* Transforming Legal Services */}
                <AnimText delay={1} />
              </h1>
              <p className="md:mt-[28px] mt-[18px] md:mb-[15px] mb-[8px] w-full max-w-[600px] tracking-[1px] md:text-[20px] text-[14px]">
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
          <div className="hidden lg:block lg:flex-[3] xl:mt-14">
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
          className="bg-[url(/sample-questions-bg.svg)] bg-no-repeat bg-cover bg-center w-full flex flex-col md:flex-row items-center justify-between gap-4 lg:px-[60px] px-[5%]"
        >
          <div className="md:w-[40%]">
            <h1 className="font-PoppinsBold xl:text-[58px] md:text-[36px] text-[28px] font-bold xl:leading-[60px] leading-[40px] tracking-[1px] max-w-[500px]">
              Ask us anything anytime!
            </h1>
            <p className="xl:mt-[28px] mt-[18px] mb-[15px] w-full max-w-[500px] xl:tracking-[1px] xl:text-[20px] text-[16px]">
              The Experts at AskUs are ready to answer your questions, day or
              night.
            </p>
            <Button
              className="xl:mt-3 mt-1 bg-primary text-white rounded-[10px]"
              size="lg"
            >
              Get started
            </Button>
          </div>

          <SampleQuestionsSlider />
        </section>

        <Spacer />

        <section id="why-ask-us">
          <div className="flex flex-col items-center max-w-[768px] lg:max-w-full mx-auto">
            <h2 className="font-PoppinsBold md:text-[60px] text-[36px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase">
              Services
            </h2>
            <h3 className="md:text-[48px] text-[24px] font-semibold md:-mt-11 -mt-8">
              Why you should use <span className="font-bold">AskUs</span>
            </h3>
            <div className="h-1 bg-primary min-w-[100px]"></div>
          </div>

          <div className="mt-12"></div>

          <div className="hidden md:flex justify-center">
            <div className="flex flex-col gap-12">
              <div className="h-[135px] flex items-center">
                <h2 className="font-PoppinsBold lg:text-[60px] text-[50px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase lg:mr-7 mr-4 ml-8 lg:ml-0">
                  01
                </h2>
                <Image
                  src={"circle-check.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
                <div className="lg:min-w-[210px] min-w-[176px] border border-dashed"></div>
                <div className="w-4 h-4 rounded-full -mr-[10px] bg-primary relative z-10"></div>
              </div>

              <div className="h-[135px] flex flex-col justify-center">
                <h3 className="font-PoppinsBold font-bold lg:text-[28px] text-[22px] text-primary ">
                  Available 24/7
                </h3>
                <p className="mt-2 text-xl lg:max-w-[400px] max-w-[300px]">
                  Available 24/7 for your convenience! Get in touch anytime, day
                  or night, for swift and reliable assistance.
                </p>
              </div>

              <div className="h-[135px] flex items-center">
                <h2 className="font-PoppinsBold lg:text-[60px] text-[50px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase lg:mr-7 mr-4 ml-8 lg:ml-0">
                  03
                </h2>
                <Image
                  src={"icon3.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
                <div className="lg:min-w-[210px] min-w-[164px] border border-dashed"></div>
                <div className="w-4 h-4 rounded-full -mr-[10px] bg-primary relative z-10"></div>
              </div>

              <div className="h-[135px] flex flex-col justify-center">
                <h3 className="font-PoppinsBold font-bold lg:text-[28px] text-[22px] text-primary ">
                  Tailored answers
                </h3>
                <p className="mt-2 text-xl lg:max-w-[400px] max-w-[300px]">
                  Every answer is bespoke to you and addresses your query
                  without the expensive price tag of in person legal guidance.
                </p>
              </div>

              <div className="h-[135px] flex items-center">
                <h2 className="font-PoppinsBold lg:text-[60px] text-[50px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase lg:mr-7 mr-4 ml-8 lg:ml-0">
                  05
                </h2>
                <Image
                  src={"icon5.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
                <div className="lg:min-w-[210px] min-w-[164px] border border-dashed"></div>
                <div className="w-4 h-4 rounded-full -mr-[10px] bg-primary relative z-10"></div>
              </div>
            </div>
            <div className="border border-dashed h-[calc(870px-130px)] mt-[65px]"></div>
            <div className="flex flex-col gap-12">
              <div className="h-[135px] flex flex-col justify-center px-8">
                <h3 className="font-PoppinsBold font-bold lg:text-[28px] text-[22px] text-primary">
                  Expert lawyers
                </h3>
                <p className="mt-2 text-xl lg:max-w-[400px] max-w-[300px]">
                  We have high quality verified expert lawyers ready to help
                  you.
                </p>
              </div>

              <div className="h-[135px] flex items-center">
                <div className="w-4 h-4 rounded-full -ml-[10px] bg-primary relative z-10"></div>
                <div className="lg:min-w-[210px] min-w-[189px] border border-dashed"></div>
                <Image
                  src={"Icon2.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
                <h2 className="font-PoppinsBold lg:text-[60px] text-[50px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase lg:ml-7 ml-4">
                  02
                </h2>
              </div>

              <div className="h-[135px] flex flex-col justify-center pl-8">
                <h3 className="font-PoppinsBold font-bold lg:text-[28px] text-[22px] text-primary">
                  Connect with an expert
                </h3>
                <p className="mt-2 text-xl lg:max-w-[400px] max-w-[300px]">
                  Realise the convenience of connecting to your expert from home
                  saving time and money.
                </p>
              </div>

              <div className="h-[135px] flex items-center">
                <div className="w-4 h-4 rounded-full -ml-[10px] bg-primary relative z-10"></div>
                <div className="lg:min-w-[210px] min-w-[189px] border border-dashed"></div>
                <Image
                  src={"icon4.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                />
                <h2 className="font-PoppinsBold lg:text-[60px] text-[50px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase lg:ml-7 ml-4">
                  04
                </h2>
              </div>

              <div className="h-[135px] flex flex-col justify-center pl-8">
                <h3 className="font-PoppinsBold font-bold lg:text-[28px] text-[22px] text-primary">
                  Fast and reliable
                </h3>
                <p className="mt-2 text-xl lg:max-w-[400px] max-w-[300px]">
                  Our service is fast and reliable, you can speak to an expert
                  in minutes rather than waiting days or weeks for an
                  appointment.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-14 md:hidden">
            {services.map((service, i) => (
              <div key={`services_mobile${service.id}`} className="">
                <div
                  className={`${
                    (i + 1) % 2 === 0 && "flex-row-reverse"
                  } flex items-center justify-center`}
                >
                  <h2 className="font-PoppinsBold lg:text-[60px] text-[50px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase lg:mr-7 mr-4 ml-8 lg:ml-0">
                    {service.id}
                  </h2>
                  <Image
                    src={service.icon}
                    alt=""
                    width={100}
                    height={100}
                    className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
                  />
                </div>

                <div className="mt-4 flex flex-col justify-center items-center">
                  <h3 className="font-PoppinsBold font-bold lg:text-[28px] text-[22px] text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xl max-w-[280px] text-center">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Spacer />

        <section
          id="cta"
          className="w-full h-[400px] bg-[url(/get-started-bg.png)] bg-cover bg-center flex flex-col items-center justify-center lg:gap-8 gap-4 text-white px-4"
        >
          <h2 className="lg:text-[48px] md:text-[32px] text-[26px] font-PoppinsBold font-bold text-center md:text-start ">
            Start your chat with an expert now
          </h2>
          <p className="lg:max-w-[544px] max-w-[344px] lg:text-[20px] text-[16px] text-center">
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
            <h2 className="font-PoppinsBold md:text-[60px] text-[36px] font-bold leading-[60px] tracking-[1px] text-primary/10 uppercase">
              Testimonials
            </h2>
            <h3 className="md:text-[48px] text-[24px] font-bold md:-mt-11 -mt-8">
              What our clients say
            </h3>
            <div className="h-1 bg-primary min-w-[100px]"></div>
          </div>

          <div className="mt-[100px] grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:px-[60px] px-[5%] place-items-center">
            {testimonials.map((testomial, index) => (
              <div
                key={`testimonials_t-${index}`}
                className="shadow-[0px_0px_17.7px_3px_rgba(0,_0,_0,_0.09)] rounded-3xl max-w-[300px] h-fit md:h-[320px] bg-white px-[14px] py-[18px] relative"
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
                  <div className="font-bold ">{testomial.user}</div>
                </div>
                <div className="h-full grid place-items-center">
                  <div className="">
                    <div className="">
                      <h4 className="font-bold font-PoppinsBold text-[17px] text-center mb-2 mt-3 md:mt-0">
                        {testomial.title}
                      </h4>
                      <p className="text-center text-[14px]">
                        {testomial.desc}
                      </p>
                    </div>

                    <Image
                      src="/FaQuoteLeft.svg"
                      alt=""
                      width={50}
                      height={50}
                      className="w-[50px] h-[50px] absolute bottom-0 right-0 opacity-20"
                    />
                  </div>
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
