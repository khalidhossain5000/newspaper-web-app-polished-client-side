import React from "react";
import { FaBullhorn } from "react-icons/fa";

const BreakingNews = () => {
  return (
    <div className="bg-gray-200 text-white ">
      <div className="container mx-auto bg-red-600 flex items-center rounded-sm shadow-sm font-secondary font-medium">
        {/* Label Section */}
        <div className="bg-yellow-400 text-black font-bold px-3 py-2 flex items-center justify-between gap-2 whitespace-nowrap">
          <FaBullhorn />
          <span>Breaking News</span>
        </div>

        {/* Scrolling News Text */}
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="9"
          className="py-1 xl:text-xl "
        >
          <div className="flex items-center">
            <div>NASA launches new Mars mission — World leaders meet for climate summit
          — Bitcoin hits $100k milestone — Bangladesh wins SAFF Championship —
          SpaceX successfully deploys 60 Starlink satellites! | Hello Test</div>
          <div>
            THi si sanother div er here hdhgjsdg sdgsd
          </div>
          </div>
        </marquee>
        
      </div>
    </div>
  );
};

export default BreakingNews;
