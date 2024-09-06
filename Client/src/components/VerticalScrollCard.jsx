import React, { useEffect, useRef } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScollCard = ({ data = [], heading, trending, media_type }) => {
  useEffect(() => {
    if (contaierRef.current) {
      contaierRef.current.style.overflowX = "hidden";
    }
  }, []);
  const contaierRef = useRef();

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>

      <div className=" relative">
        <div
          ref={contaierRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar-none scroll-behavior:smooth; justify-center lg:justify-normal"
        >
          {data.map((data, index) => {
            return (
              <Card
                key={data.id + "heading" + index}
                data={data}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            );
          })}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center"></div>
      </div>
    </div>
  );
};

export default HorizontalScollCard;
