import React, { useRef, useEffect } from "react";
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";
import Card from "./Card";

function HorizontalScrollCard({ data = [], heading }) {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.overflowX = "hidden";
    }
  }, []);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const handlePrevious = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-zinc-100">
        {heading}
      </h2>

      <div className="relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,228px)]  gap-6 overflow-x-auto scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.map((movie, index) => (
            <Card
              key={movie.id + "heading" + index}
              data={movie}
              index={index + 1}
              trending={true}
            />
          ))}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center">
          <button
            onClick={handlePrevious}
            className="bg-zinc-800 p-1 text-zinc-400 -ml-2 z-10"
          >
            <VscTriangleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-zinc-800 p-1 text-zinc-400 -mr-2 z-10"
          >
            <VscTriangleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HorizontalScrollCard;
