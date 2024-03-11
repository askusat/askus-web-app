import React from "react";
import Layout from "../components/layout";
import Faq from "../components/faq/faq";
import Link from "next/link";
// import { usePathname } from "next/navigation";

export const metadata = {
  title: 'AskUs Insights - Quick Answers to Your Queries',
  description: 'Dive into our FAQs for swift, clear answers about using AskUs. Understand our services, get support tips, and more—all in one place.'
}

export default function FAQPage() {
  return (
    <div>
      <Layout />
      <div className="md:px-12 px-6 pb-6">
        <header className="md:min-h-[300px] mb-12 md:mb-0">
          <div className="grid place-items-center text-center">
            <h1 className="font-PoppinsBold font-bold md:text-[48px] text-[28px]">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="lg:max-w-[40%] md:max-w-[60%] mt-3 md:mt-0">
              {`Find answers to commonly asked questions below. If you don't find what you're looking for, feel free to`}{" "}
              <Link href="/contact-us" className="text-primary">contact us.</Link>
            </p>
          </div>
        </header>

        <Faq />
      </div>
    </div>
  );
}
