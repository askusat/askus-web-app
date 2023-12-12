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
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      category: "general",
      question: `What is our return policy ${index + 1}?`,
      answer: `Our return policy allows returns within 30 days of purchase for refund or exchange Our return policy allows returns within 30 days of purchase for refund or exchange Our return policy allows returns within 30 days of purchase for refund or exchange ${
        index + 1
      }.`,
    })),

  // Subscription
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      category: "subscription",
      question: `How do I cancel my subscription ${index + 1}?`,
      answer: `To cancel your subscription, visit your account settings and select the 'Cancel Subscription' option ${
        index + 1
      }.`,
    })),

  // Account
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      category: "account",
      question: `How do I change my account password ${index + 1}?`,
      answer: `To change your account password, go to your account settings and select the 'Change Password' option for password ${
        index + 1
      }.`,
    })),

  // Technical
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      category: "technical",
      question: `How do I troubleshoot connection issues ${index + 1}?`,
      answer: `Troubleshooting connection issues can often be resolved by restarting your device and checking your internet connection for issue ${
        index + 1
      }.`,
    })),

  // Security
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      category: "security",
      question: `How I'm I assured that my information are safe ${index + 1}?`,
      answer: `Data collected are not been share anywhy not with anyone ${
        index + 1
      }.`,
    })),

  // Privacy
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      category: "privacy",
      question: `How do I manage my privacy settings ${index + 1}?`,
      answer: `Privacy settings can be managed in your account privacy preferences for settings ${
        index + 1
      }.`,
    })),
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
              className={`${
                seletedCategory !== c.toLowerCase() &&
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
        className={`${
          !open && "h-0 pointer-events-none opacity-0 -mt-10 "
        } transition-all duration-300 w-full py-3 mt-3 px-4 border border-gray-400 rounded-[8px] mb-10`}
      >
        <p className="text-sm">{qa.answer}</p>
      </div>
    </li>
  );
};
