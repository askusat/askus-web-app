"use client";

import { Button } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { TbCloudQuestion } from "react-icons/tb";

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const clonedQuestions = [...questions, ...questions, ...questions, ...questions]; // Duplicate questions

  const scroll = (scrollOffset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const startAutoScroll = () => {
    if (!scrollInterval) {
      const interval = setInterval(() => {
        if (!isHovered && sliderRef.current) {
          const currentScroll = sliderRef.current.scrollLeft;
          const maxScroll =
            sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

          if (currentScroll >= maxScroll) {
            sliderRef.current.scrollTo({ left: 0, behavior: "auto" });
          } else {
            sliderRef.current.scrollBy({
              left: 4, // Adjust the scroll speed here
              behavior: "smooth",
            });
          }
        }
      }, 4000); // Adjust the interval duration here

      setScrollInterval(interval);
    }
  };

  const stopAutoScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseEnter = () => {
    setIsHovered(true);
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startAutoScroll();
  };

  return (
    <div
      className="md:w-[60%] relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={sliderRef}
        className="w-screen md:w-full overflow-x-auto flex items-center gap-6 scrolled-remove h-[310px] px-4 snap-x snap-mandatory"
        data-snap-slider="basic-example"
        style={{ scrollBehavior: isHovered ? "auto" : "smooth" }}
      >
        {/* <div className="flex items-center gap-6"> */}
        {clonedQuestions.map((quest, index) => (
          <div
            key={`quest_id_${quest.id}_${index}`}
            className="shadow-[0px_0px_17.7px_3px_rgba(0,_0,_0,_0.09)] rounded-3xl min-w-[300px] h-[200px] bg-white flex flex-col items-center px-8 snap-start"
          >
            <div className="w-[40px] h-[40px] rounded-full shadow-[0px_0px_17.7px_3px_rgba(0,_0,_0,_0.09)] bg-white -mt-[20px] grid place-items-center">
              <TbCloudQuestion />
            </div>

            <p className="text-center mt-6">{`"${quest.title}"`}</p>
          </div>
        ))}
        {/* </div> */}
      </div>

      <div className="flex items-center gap-6 absolute right-0 -bottom-12">
        <Button
          className="min-w-[60px] min-h-[60px] rounded-full grid place-items-center bg-white hover:bg-primary hover:text-white shadow-lg"
          onClick={() => scroll(-200)} // Adjust scroll value as needed
        >
          <FaAngleLeft size={22} />
        </Button>
        <Button
          className="min-w-[60px] min-h-[60px] rounded-full grid place-items-center bg-white hover:bg-primary hover:text-white shadow-lg"
          onClick={() => scroll(200)} // Adjust scroll value as needed
        >
          <FaAngleRight size={22} />
        </Button>
      </div>
    </div>
  );
}
