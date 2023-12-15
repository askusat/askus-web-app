"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Link from "next/link";

const categories = [
  "General",
  "Subscription",
  "Account",
  "Technical",
  "Security",
  "Privacy",
];

interface QuesAnsItemType {
  category: string;
  question: string;
  answer: string;
}
type QuesAnsType = QuesAnsItemType[];

const questionsAndAnswers: QuesAnsType = [
  // General
  {
    category: "general",
    question: `How do I ask a question?`,
    answer: `To ask a question on Askusat.co.uk go to our homepage or sign into your account and enter your question. If you have credit (on a pay as you go) service or are subscribed your question will be posted and our experts will look to respond in minutes. If you do not have credit and are not a subscriber on our subscription payment model you will be prompted to credit your account to be able to ask the question on a pay as you go basis.`,
  },
  {
    category: "general",
    question: `How much does asking a question cost?`,
    answer: `Askusat.co.uk has different payment models, when you initially enter the site you may be offered a trial for a set period for a nominal fee to try out the site. At the end of the trial period, if you have not cancelled your subscription you will be entered into a subscription where you will pay monthly for continued access to askusat.co.uk in order to post questions. In the alternative, you may choose to cancel the subscription and pay to post questions on a pay as you go basis, you will be shown the cost of posting a question and asked to consent to the payment before the question is posted.`,
  },
  {
    category: "general",
    question: `How long does it take to get a response?`,
    answer: `Our aim is to always provide a response within minutes of you posting a question, 24/7 however, we cannot guarantee any particular response time. That said, our service is often much faster and more efficient than booking an appointment with a professional would otherwise be.`,
  },
  {
    category: "general",
    question: `Who are the Experts?`,
    answer: `Our experts are legal professionals with the extensive experience needed to be able to answer your questions. `,
  },
  {
    category: "general",
    question: `Is my question and answer confidential?`,
    answer: `Askusat.co.uk is a public website and questions and answers are not and should not be considered confidential. We therefore recommend not supplying information that can be used to easily identify you. In addition, no lawyer-client privilege attaches to the conversation or your interactions with AskUsat.co.uk`,
  },
  {
    category: "general",
    question: `How can I cancel my subscription?`,
    answer: `We are sorry you would like to cancel your subscription. To cancel your subscription you can select Cancel Subscription once logged into your account.`,
  },
];

export default function Faq() {
  const [seletedCategory, setSeletedCategory] = useState("general");

  useEffect(() => {
    const hash = window.location.hash;
    categories.includes(hash) && setSeletedCategory(hash.substring(1));
  }, []);

  return (
    <main className="lg:max-w-[60%] md:max-w-[80%] mx-auto flex flex-col md:flex-row gap-12 mb-20">
      <ul className="flex md:flex-col flex-wrap gap-4">
        {categories.map((c, i) => (
          <li key={`categ-${i + 1}`} className="">
            <Link
              href={`/faq#${c.toLowerCase()}`}
              className={`${seletedCategory !== c.toLowerCase() &&
                "text-black hover:text-primary"
                } bg-blue-100/50 py-1 px-3 rounded-lg w-full`}
              onClick={() => setSeletedCategory(c.toLowerCase())}
            >
              <span className="font-bold mr-2">#</span>
              {c}
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-full">
        <div className="">
          <div className="font-semibold mb-4 capitalize">
            {seletedCategory} Questions
          </div>
          <ul className="">
            {questionsAndAnswers
              .filter((qa) => qa.category === seletedCategory)
              .map((qa: QuesAnsItemType, i) => (
                <QuesAns key={`qa-${qa.category}_${i + 1}`} qa={qa} />
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

const QuesAns = ({ qa }: { qa: QuesAnsItemType }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li ref={ref}>
      <Button
        variant="faded"
        aria-label="andle left"
        // size="sm"
        className="hover:bg-primary hover:text-white text-primary w-full border-none flex justify-between items-center py-6 px-4 rounded-[8px] group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-base">{qa.question}</span>
        {open ? <FaAngleUp className="" /> : <FaAngleDown className="" />}
      </Button>

      <div
        className={`${!open && "h-0 pointer-events-none opacity-0 -mt-10 "
          } transition-all duration-300 w-full py-3 mt-3 px-4 border border-gray-400 rounded-[8px] mb-10`}
      >
        <p className="text-sm">{qa.answer}</p>
      </div>
    </li>
  );
};
