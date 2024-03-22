import React from "react";
import Image from "next/image";
import Nav from "../components/layout/nav";
import happyClient from "../assets/happyClient.png";
import hammer from "../assets/hammer.png";
import discussion from "../assets/discussion.png";
import lapi from "../assets/lapi.png";
export const metadata = {
    title: 'Online Legal Advice | Online Solicitor UK | Askusat',
    description: 'Get expert Online Legal Advice from our Online Solicitor UK team, offering prompt and professional legal support for all your needs'
}

export default function page() {
    const column = [
        {
            "id": 1,
            "heading": "Family Law",
            "peragraph": "Navigating family law matters can be challenging, but our online legal advice UK makes it easier. From divorce proceedings to child custody disputes and adoption processes, our online legal advice UK is here to provide guidance and support every step of the way. Trust us to handle your family law concerns with care and expertise."
        },
        {
            "id": 2,
            "heading": "Personally Injury",
            "peragraph": "If you've suffered a personal injury, ask a solicitor online to seek justice. Whether it's filing compensation claims for accidents or addressing cases of medical negligence, our skilled legal team will work tirelessly to ensure you receive the compensation and support you deserve."
        },
        {
            "id": 3,
            "heading": "Business Law",
            "peragraph": "In the complex world of business law, our platform offers essential support. From drafting contracts to resolving disputes and protecting intellectual property rights, our online solicitor advice provides comprehensive guidance to ensure your business operates smoothly and efficiently."
        },
        {
            "id": 4,
            "heading": "Property Law",
            "peragraph": "Navigating property law matters can be complex, but our platform simplifies the process. Whether you're buying or selling property or dealing with landlord/tenant issues, our online legal advice UK provides guidance and support every step of the way. Trust us to protect your interests."
        },
        {
            "id": 5,
            "heading": "Criminal Law",
            "peragraph": "In matters of criminal law, our platform offers online law advice UK and representation. From DUI charges to assault and theft cases, our experienced legal team provides steadfast support to navigate the complexities of the legal system and defend your rights effectively. Trust us to advocate for your best interests in criminal matters."
        }
    ];

    const column2 = [
        {
            "id": 1,
            "heading": "Reputation:",
            "peragraph": " Lawyers at Askus Anytime have a stellar reputation, backed by a track record of satisfied clients. With glowing reviews, testimonials, and high ratings, we're known for our reliability and credibility in delivering top-notch legal services."
        },
        {
            "id": 2,
            "heading": "Expertise:",
            "peragraph": " Gain access to a team of qualified and experienced lawyers who specialize in various legal fields. Our lawyers possess the knowledge and skills needed to address your specific legal issues effectively, ensuring you receive accurate and reliable online legal advice UK tailored to your needs."
        },
        {
            "id": 3,
            "heading": "User-Friendly Interface:",
            "peragraph": "Enjoy a seamless and hassle-free experience with our intuitive platform. Designed with easy navigation and a user-friendly interface, scheduling consultations, communicating with lawyers, and accessing essential documents are all made simple, enhancing your overall experience."
        },
        {
            "id": 4,
            "heading": "Security:",
            "peragraph": "Your privacy and confidentiality are our top priorities. Rest assured that our platform employs state-of-the-art encryption technology and robust security measures to safeguard your sensitive information. With us, your legal matters remain private, secure, and protected at all times."
        }
    ];

    const column3 = [
        {
            "id": 1,
            "heading": "Registration:",
            "peragraph": "Sign up for an account on our platform by providing basic information about yourself and your legal issue."
        },
        {
            "id": 2,
            "heading": "Select a Lawyer:",
            "peragraph": "Browse through our network of expert lawyers and select a lawyer who specializes in your specific legal matter."
        },
        {
            "id": 3,
            "heading": "Appointment:",
            "peragraph": "Schedule a consultation with your chosen lawyer at a time that is convenient for you."
        },
        {
            "id": 4,
            "heading": "Consultation:",
            "peragraph": "During the consultation, discuss your legal issue with the lawyer, ask questions, and receive personalized advice and guidance tailored to your needs."
        },
        {
            "id": 5,
            "heading": "Follow-Up:",
            "peragraph": "Follow up with your lawyer as needed to address any additional questions or concerns you may have."
        }
    ];

    const column4 = [
        {
            "id": 1,
            "heading": "Is online legal advice UK as reliable as in-person consultations?",
            "peragraph": "SYes, online legal advice UK can be just as reliable as in-person consultations, provided that you choose a reputable platform and work with qualified lawyers who specialize in your specific legal issue.."
        },
        {
            "id": 2,
            "heading": "How much does online solicitor advice cost?",
            "peragraph": "The cost of online solicitor advice varies depending on the platform and the complexity of your legal issue. Our platform offers transparent pricing and flexible payment options to ensure that online legal advice UK remains accessible to all."
        },
        {
            "id": 3,
            "heading": "Is my information secure when accessing legal advice online?",
            "peragraph": "Yes, protecting your privacy and security is our top priority. Our platform utilizes encryption technology and other security measures to safeguard your sensitive information and ensure that your legal matters remain private and secure."
        },
        {
            "id": 4,
            "heading": "Can I get legal advice online for urgent matters?",
            "peragraph": "Yes, our platform offers prompt legal assistance for urgent matters. Simply schedule a consultation with one of our expert lawyers, and they will prioritize your case to provide timely guidance and support."
        },
        {
            "id": 5,
            "heading": "How long does a typical online legal advice UK last?",
            "peragraph": "The duration of online law advice UK varies depending on the complexity of the legal issue and the amount of information to be discussed. Typically, consultations range from 30 minutes to an hour, but our lawyers are dedicated to addressing all your concerns within the allotted time."
        },
        {
            "id": 6,
            "heading": "Can I communicate with my lawyer outside of scheduled consultations?",
            "peragraph": "Absolutely, our platform encourages ongoing communication between clients and lawyers. You can reach out to your lawyer via email or secure messaging at any time to ask questions, provide updates, or seek clarification on legal matters."
        },
        {
            "id": 7,
            "heading": "Are there any limitations to the types of legal issues that can be addressed online?",
            "peragraph": "While many legal issues can be effectively addressed online, there may be certain complex or specialized matters that require in-person consultations or additional resources. Our platform's expert lawyers will assess your case and advise you on the best course of action for your specific situation."
        },
        {
            "id": 8,
            "heading": "What if I'm not satisfied with the legal advice provided online?",
            "peragraph": "We strive to ensure that all our clients are satisfied with the legal advice and services they receive. If you have any concerns or issues with the advice provided, please contact our customer support team, and we will work diligently to address your needs and resolve any issues promptly and professionally."
        }
    ];

    const column5 = [
        {
            "id": 1,
            "heading": "Case Study 1:",
            "heading2": "Jane's Divorce",
            "peragraph": "Jane was going through a difficult divorce and needed legal advice on how to protect her interests and ensure a fair settlement. Through our online platform, she was able to connect with an experienced family lawyer who provided her with personalized advice and guidance throughout the process. With the help of her lawyer, Jane was able to navigate the complexities of the divorce proceedings and achieve a favorable outcome."
        },
        {
            "id": 2,
            "heading": "Case Study 2:",
            "heading2": "John's Personal Injury Claim",
            "peragraph": "John was injured in a car accident and needed to ask a solicitor online on how to pursue a personal injury claim against the responsible party. Unable to visit a law office due to his injuries, John turned to our online legal advice UK for assistance. Through our platform, he was able to connect with a skilled personal injury lawyer who guided him through the legal process, explained his rights, and helped him build a strong case. With the support of his lawyer, John successfully negotiated a fair settlement that covered his medical expenses and compensated him for his pain and suffering."
        },
        {
            "id": 3,
            "heading": "Case Study 3:",
            "heading2": "Sarah's Business Dispute",
            "peragraph": "Sarah, a small business owner, found herself embroiled in a complex legal dispute with a former business partner. Unsure of her rights and the best course of action, she sought legal advice online through our platform. With the guidance of an experienced business lawyer, Sarah was able to navigate the intricacies of the dispute, negotiate a favorable resolution, and protect her business interests effectively."
        },
        {
            "id": 4,
            "heading": "Case Study 4:",
            "heading2": "Michael's Landlord/Tenant Issue",
            "peragraph": "Michael, a tenant, encountered difficulties with his landlord regarding maintenance issues and rent disputes. Frustrated and unsure of his rights, he turned to our online platform for assistance. With the help of a knowledgeable landlord/tenant lawyer, Michael gained clarity on his legal position, successfully resolved the issues with his landlord, and ensured fair treatment throughout the tenancy."
        },
        {
            "id": 5,
            "heading": "Case Study 5:",
            "heading2": "Emily's Intellectual Property Concerns",
            "peragraph": "Emily, a creative entrepreneur, was concerned about protecting her intellectual property rights for her innovative product designs. Seeking online law advice UK, she accessed our platform to connect with an intellectual property lawyer specializing in her industry. With expert advice and strategic counsel, Emily developed a robust IP protection strategy, safeguarding her creations and ensuring their long-term viability in the market."
        }
    ];

    return (
        <div className="">
            <div className="py-3 md:px-8 px-4">
                <Nav />
            </div>

            <div className="flex flex-col mb-10 mt-8 justify-center items-center">
                <h1 className="text-[40px] border-b-2 mb-8 font-bold  border-white border-1  border-l-0 border-r-0 border-t-0 text-center" >
                    Get Legal Advice online in the UK
                </h1>
                <div
                    className="flex md:px-20 items-center  mb-4 overflow-hidden justify-center"
                    id="aboutus"
                >
                    <div>
                        <Image
                            src={happyClient}
                            alt="logo"
                            width={1000}
                            height={400}
                            className=" w-[full] max-w-[auto] h-[auto] object-center object-cover "
                        />
                    </div>
                </div>
                <p className="text-[18px] mt-4 font-PoppinsRegular mx-custom text-center">
                    {`Ask us anything, and we'll offer you the best legal advice we can`}
                </p>
                <div className="lg:max-w-[60%] md:max-w-[80%]  mx-auto mt-10  md:flex-row gap-12 mb-20">
                    <div className=" space-y-5">
                        <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8">
                            <h1 className="text-[30px] leading-[40px] mx-custom font-PoppinsBold">
                                Solicitor Advice & Legal Consultation Online
                            </h1>
                            <p className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start">
                                {`Gain instant access to online legal advice UK with our expert lawyers. Our team of solicitors is here to provide personalized guidance and support for your legal matters, all from the comfort of your own home. Whether you're dealing with family law issues, personal injury claims, business disputes, or any other legal concerns, ask a solicitor online for a convenient and efficient solution to meet your needs.`}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8">
                            <h1 className="text-[30px] leading-[40px] mx-custom font-PoppinsBold">
                                Understanding Online Legal Advice UK
                            </h1>
                            <p className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start">
                                Legal advice online plays a crucial role in various legal matters, offering guidance and expertise to individuals navigating complex legal issues. Traditionally, seeking online solicitor advice involved scheduling in-person consultations with lawyers, often accompanied by long wait times and geographical limitations. However, with Askus Anytime, individuals now have the opportunity to access professional legal guidance remotely, from the comfort of their own homes or offices.

                            </p>
                        </div>
                        <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8">
                            <h1 className="text-[30px] leading-[40px] mx-custom font-PoppinsBold">
                                Benefits of Seeking Legal Advice Online
                            </h1>
                            <p className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start">
                                There are numerous benefits to seeking online legal advice UK through our platform. By offering legal advice online, we aim to provide our clients with a convenient and efficient way to access expert legal guidance whenever they need it, empowering them to navigate their legal matters with confidence and peace of mind.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8">
                            <h1 className="text-[18px] leading-[40px] mx-custom font-PoppinsBold">Convenience:<span className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start ml-2">  Access legal advice online from anywhere, at any time, without the need for in-person meetings or travel.
                            </span>
                            </h1>
                        </div>

                        <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8">
                            <h1 className="text-[18px] leading-[40px] mx-custom font-PoppinsBold">Accessibility:<span className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start ml-2">Overcome geographical barriers and reach expert lawyers nationwide, ensuring that individuals have access to online law advice UK they need, regardless of their location.
                            </span>
                            </h1>
                        </div>
                        <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8">
                            <h1 className="text-[18px] leading-[40px] mx-custom font-PoppinsBold">Cost-Effectiveness:<span className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start ml-2">Save time and money compared to traditional in-person consultations, with transparent pricing and flexible payment options available.
                            </span>
                            </h1>
                        </div>
                        <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8">
                            <h1 className="text-[18px] leading-[40px] mx-custom font-PoppinsBold">Confidentiality:<span className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start ml-2">Ensure privacy and confidentiality of sensitive legal matters, with robust security measures in place to protect client information.
                            </span>
                            </h1>
                        </div>
                        <h1 className="text-[40px] border-b-2 font-bold  border-white border-1 mt-8  border-l-0 border-r-0 border-t-0 text-center" >
                            Types of Legal Issues Addressed Online
                        </h1>
                        <div
                            className="flex md:px-20 items-center mb-8  justify-center"
                            id="aboutus"
                        >
                            <div>
                                <Image
                                    src={hammer}
                                    alt="logo"
                                    width={1000}
                                    height={400}
                                    className=" w-[full] max-w-[auto] h-[auto] object-center object-cover "
                                />
                            </div>
                        </div>
                        <p className="text-[18px]  font-PoppinsRegular mx-custom text-center mb-8">
                            Our platform caters to a wide range of legal issues, including but not limited to:
                        </p>

                        {column.map((item, index) => {
                            return (
                                <div className="flex flex-col justify-center item-center px-6 md:px-0 mt-6" key={index}>
                                    <h1 className="text-[30px] leading-[40px] mx-custom font-PoppinsBold" >
                                        {item.heading}
                                    </h1>
                                    <p className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start">
                                        {item.peragraph}
                                    </p>
                                </div>
                            )
                        })}
                        <div className="justify-center items-center mt-4">
                            <h1 className="text-[40px] border-b-2 font-bold mb-8  mt-8 border-white border-1  border-l-0 border-r-0 border-t-0 text-center">
                                Why Choose Us as Your Online Legal Service Provider?
                            </h1>
                            <div
                                className="flex md:px-20 items-center  mb-4 overflow-hidden justify-center"
                                id="aboutus"
                            >
                                <div>
                                    <Image
                                        src={discussion}
                                        alt="logo"
                                        width={1000}
                                        height={400}
                                        className=" w-[full] max-w-[auto] h-[auto] object-center object-cover "
                                    />
                                </div>
                            </div>
                            <p className="text-[18px] mt-6 font-PoppinsRegular mx-custom text-center">
                                {`When it comes to selecting an online legal advice UK provider, making the right choice is crucial. Here's why you should choose us:`}
                            </p>
                        </div>
                        {column2.map((item,index) => {
                            return (
                                <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8" key={index}>
                                    <h1 className="text-[18px] leading-[40px] mx-custom font-PoppinsBold">{item.heading}<span className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start ml-2">{item.peragraph}
                                    </span>
                                    </h1>
                                </div>
                            )
                        })}
                        <div className="justify-center items-center">
                            <h1 className="text-[40px] border-b-2 font-bold mb-4 border-white border-1  border-l-0 border-r-0 border-t-0 text-center mt-8 mb-8">
                                How to Access Legal Advice Online in the UK ?
                            </h1>
                            <div
                                className="flex md:px-20 items-center  mb-4 overflow-hidden justify-center"
                                id="aboutus"
                            >
                                <div>
                                    <Image
                                        src={lapi}
                                        alt="logo"
                                        width={1000}
                                        height={400}
                                        className=" w-[full] max-w-[auto] h-[auto] object-center object-cover "
                                    />
                                </div>
                            </div>
                            <p className="text-[18px] mt-4 font-PoppinsRegular mx-custom text-center mb-8">
                                {`Accessing legal advice online through our platform is quick and easy. Here's how it works:`}
                            </p>
                        </div>
                        {column3.map((item,index) => {
                            return (
                                <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8" key={index}>
                                    <h1 className="text-[18px] leading-[40px] mx-custom font-PoppinsBold">{item.heading}<span className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start ml-2">{item.peragraph}
                                    </span>
                                    </h1>
                                </div>
                            )
                        })}
                        <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8">
                            <h1 className="text-[30px] leading-[40px] mx-custom font-PoppinsBold text-center mt-8 mb-2">
                                FAQs About Legal Advice Online
                            </h1>
                            <p className="text-[18px] mt-4 font-PoppinsRegular mx-custom  text-center mb-8">
                                Still have questions about legal advice online? Check out our FAQs section for answers to common queries and concerns:
                            </p>
                        </div>
                        {column4.map((item, index) => {
                            return (
                                <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8" key={index}>
                                    <h1 className="text-[30px] leading-[40px] mx-custom font-PoppinsBold" >
                                        {item.id}.<span className="ml-2">{item.heading}</span>
                                    </h1>
                                    <p className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start">
                                        {item.peragraph}
                                    </p>
                                </div>
                            )
                        })}
                        <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8">
                            <h1 className="text-[30px] leading-[40px] mx-custom font-PoppinsBold text-center mt-8 mb-8">
                                Case Studies: Real-Life Examples of Legal Advice Online
                            </h1>
                            <p className="text-[18px]  font-PoppinsRegular mx-custom text-center mb-8">
                                Still not convinced that legal advice online is right for you? Take a look at some real-life examples of clients who have benefited from our online legal advice UK service.
                            </p>
                        </div>
                        {column5.map((item,index) => {
                            return (
                                <div className="flex flex-col justify-center item-center px-6 md:px-0 mb-8" key={index}>
                                    <h1 className="text-[18px] leading-[40px] mx-custom font-PoppinsBold">{item.heading}<span className="text-[18px] leading-[40px] mx-custom font-PoppinsBold ml-2">{item.heading2}
                                    </span>
                                    </h1>
                                    <p className="text-[18px] mt-4 font-PoppinsRegular mx-custom md:text-start">{item.peragraph}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
