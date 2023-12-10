import React from "react";
import Layout from "../components/layout";
import Faq from "../components/faq/faq";
import { Link } from "@nextui-org/react";
// import { usePathname } from "next/navigation";

export default function FAQPage() {
  // const pathname = usePathname()

  return (
    <div>
      <Layout />
      <div className="px-12 pb-6">
        <header className="min-h-[300px]">
          <div className="grid place-items-center text-center">
            <h1 className="font-PoppinsBold font-bold text-[48px]">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="lg:max-w-[40%] max-w-[60%]">
              {`Find answers to commonly asked questions below. If you don't find what you're looking for, feel free to`}{" "}
              <Link href="/contact-us">contact us.</Link>
            </p>
          </div>
        </header>

        <Faq />
      </div>
    </div>
  );
}
