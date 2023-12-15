import React from 'react'
import Layout from '../components/layout'
import { FaCircle } from "react-icons/fa";
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div>
      <Layout />
      <div className="md:px-12 px-6 pb-6">
        <header className="md:min-h-[300px] mb-12 md:mb-0">
          <div className="grid place-items-center text-center">
            <h1 className="font-PoppinsBold font-bold md:text-[48px] text-[28px]">
              PRIVACY AND POLICY
            </h1>
            <p className="lg:max-w-[40%] md:max-w-[60%] mt-3 md:mt-0">
              {`Find answers to commonly asked questions below. If you don't find what you're looking for, feel free to`}{" "}
              <Link href="/contact-us">contact us.</Link>
            </p>
          </div>
        </header>

        <div className="lg:max-w-[60%] md:max-w-[80%] mt-0 mx-auto flex  items-center justify-center flex-col gap-10 mb-20">
          <div className=""><span className="font-bold">Ask Us</span> Anytime Limited is a company domiciled in the United Kingdom (“AskUs”, “we”, “our”, “us”). Any questions related to this policy can be directed to  <Link href="/contact-us">dpo@askusat.co.uk</Link> AskUs operates the site askusat.co.uk   <Link href="/">(“the Site”)</Link></div>

          <div className="flex flex-col">
            <h1 className="font-PoppinsBold mb-4">Overview</h1>
            <p className="">We encourage you to review this Privacy Notice in its entirety for comprehensive understanding. However, if you prefer to access specific sections directly, you can utilize the links below to navigate to those sections of interest.</p>

            <div className="mt-4"></div>
            <Link href="#page1" className="hover:underline">1. Data Collection</Link>
            <Link href="#page2" className="hover:underline" >2. Utilization of Collected Data</Link>
            <Link href="#page3" className="hover:underline">3. Data Sharing</Link>
            <Link href="#page4" className="hover:underline">4. Sharing Data with International Entities</Link>
            <Link href="#page5" className="hover:underline">5. Retention of Data</Link>
            <Link href="#page6" className="hover:underline">6. Your Rights </Link>
          </div>

          <div className="" id='page1'>
            <h1 className="ml-10 font-bold">1. Data Collection</h1>
            <p className="mt-4">Personal information is any information which relates to you as an individual and from which you might be identified, either directly or indirectly such as your name, address and email address. </p>
            <p className="mt-4"> As part of using the site we may ask you for personal information which you can choose to supply voluntarily for example as part of the account registration process you would need to supply your name and email address amongst other information. In order to ask a question you need to provide payment information </p>
            <p className="mt-4">  In order to information you provide voluntarily, we may also collect some data automatically from your device such as your IP address, the date and time of your visit and pages you access. Such information can be considered personal information. We use cookies to collect this information, this is collected to enable us to better understand those visiting our site including what interests visitors to our site and to be able to enhance the service provided.</p>
            <p className="mt-4">In addition to the above sources of data we may also receive personal information from you through third party sources (including third party websites where you have chosen to make such information available) but only where we have checked the sites have your consent to share your information with us or where they are legally permitted or required to disclose such personal data to us for example information you provide on public forums such as our pages on social media websites such as Facebook and on review sites like TrustPilot.</p>
            <p className='mt-4'>    If you intend to provide the data of third parties to us you should make sure you have obtained the consent of the third parties concerned to provide the data to us and in providing such data to us you indicate that you have such consent.
            </p>
          </div>

          <div className="" id='page2'>
            <h1 className="ml-10 font-bold">2. Utilization of Collected Data</h1>
            <p className="mt-4">We use your information in order to provide our services, improve the service we provide to you and advertise our services to others who may be interested in using our services in future (for example by posting quotes from any Trustpilot reviews on our site). </p>
          </div>

          <div className="" id='page3'>
            <h1 className="ml-10 font-bold">3. Data Sharing</h1>
            <p className="mt-4">In order to provide our services to you we may need to share your personal data with third parties including service providers such as payment processing companies, domain hosting service and advertising partners </p>
            <p className="mt-4">To the extent allowed by law we may also need to share your personal data with law enforcement organisations, government agencies, the court, regulators and other third parties where such disclosure is in our view necessary to comply with any applicable law or regulation, exercise or defend our legal rights or protect the rights and interests of either yourself or others.  </p>
            <p className="mt-4">We also reserve the right to disclose your personal data to potential investors or potential buyers (and their agents and advisers) in relation to any potential or actual investment, purchase or merger and acquisition of the business.  </p>
            <p className="mt-4">We may also disclose your personal data to any other party you authorise to receive such information.  </p>

          </div>

          <div className="" id='page4'>
            <h1 className="ml-10 font-bold">4. Sharing Data with International Entities</h1>
            <p className="mt-4">By using our service you consent to your data being sent outside the UK and Europe, as needed to facilitate our services to you.   </p> </div>

          <div className="" id='page5'>
            <h1 className="ml-10 font-bold">5. Retention of Data</h1>
            <p className="mt-4">We shall retain your data for such period as we feel at our absolute discretion is needed for business purposes. Under the UK GDPR the legal basis we rely on for retaining and processing your personal information is your consent, we have a contractual obligation in relation to providing the services to you and we have a legitimate interest.  </p>
            <p className="mt-4">We shall store your data securely and we utilise a number of security measures to do this. . </p>
          </div>

          <div className="" id='page6'>
            <h1 className="ml-10 flex  font-bold">6. Your Rights</h1>
            <p className="mt-4">Under data protection law you have a number of rights in relation to your data including but not limited to: </p>

            <div className=" flex mt-6 gap-3 items-center justify-center  ">
              <FaCircle size={7} />
              <p className=""><span className="font-bold">Your right of access -</span> You have the right to ask us for copies of your personal information.  </p>
            </div>
            <div className=" flex mt-3 gap-3 items-start justify-center  ml-10">
              <FaCircle size={15} className="mt-1" />
              <p className=""><span className="font-bold">Your right to rectification -</span> You have the right to ask us to rectify personal information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.   </p>
            </div>
            <div className=" flex mt-3 gap-3 items-start justify-center  ml-10">
              <FaCircle size={15} className="mt-1" />
              <p className=""><span className="font-bold">Your right to restriction of processing - </span> You have the right to ask us to restrict the processing of your personal information in certain circumstances.  </p>
            </div>

            <div className=" flex mt-3 gap-3 items-start justify-center  ml-10">
              <FaCircle size={15} className="mt-1" />
              <p className=""><span className="font-bold">Your right to data portability - </span> You have the right to ask that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances. </p>
            </div>
            <div className="mt-8 space-y-3">
              <p className="">If you wish to exercise any such rights please email dpo@askusat.co.uk. </p>
              <p className="">We reserve the right to update this privacy notice at any time. </p>
              <p className="">The data controller of your personal information is AskUs Anytime Limited</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}
