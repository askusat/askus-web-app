"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const questions = [
  {
    id: 1,
    img: "",
    title: "I would like some guidance on the likelihood of obtaining a patent",
  },
  {
    id: 2,
    img: "",
    title: "I am going through a divorce and require some help",
  },
  { id: 3, img: "", title: "I have a question about a visa application" },
  {
    id: 4,
    img: "",
    title:
      "I would like to get access to my child this is being denied by my ex",
  },
  { id: 5, img: "", title: "I have a border dispute with my neighbour" },
  { id: 6, img: "", title: "I have  a question about a Will" },
  { id: 7, img: "", title: "I have a parking ticket query" },
];

export default function SampleQuestionsSlider() {
  return (
    <div className="w-[60%] relative">
      <div className="w-full overflow-auto flex items-center gap-4 scrolled-remove">
        <div className="flex items-center gap-6">
          {questions.map((quest) => (
            <div
              key={`quest_id_${quest.id}`}
              className="shadow-[0px_0px_17.7px_3px_rgba(0,_0,_0,_0.09)] rounded-3xl w-[300px] h-[200px] bg-white flex flex-col items-center px-8"
            >
              <div className="w-[100px] h-[100px] rounded-full bg-black/60 -mt-[50px]"></div>

              <p className="text-center mt-6">{`"${quest.title}"`}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-6 absolute right-0 -bottom-20">
        <Button className="min-w-[60px] min-h-[60px] rounded-full grid place-items-center bg-white hover:bg-primary hover:text-white shadow-lg">
          <FaAngleLeft size={22} />
        </Button>
        <Button className="min-w-[60px] min-h-[60px] rounded-full grid place-items-center bg-white hover:bg-primary hover:text-white shadow-lg">
          <FaAngleRight size={22} />
        </Button>
      </div>
    </div>
  );
}
