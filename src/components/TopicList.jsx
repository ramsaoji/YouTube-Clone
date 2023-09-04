import React, { useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const topicListData = [
  "All",
  "Music",
  "Mixes",
  "Game shows",
  "Computers",
  "Gadgets",
  "Technology",
  "Live",
  "Bollywood music",
  "T-Series",
  "Gadgets",
  "Technology",
  "Live",
  "Bollywood music",
  "T-Series",
  "Bollywood music",
  "T-Series",
  "Gadgets",
  "Technology",
  "Live",
  "Bollywood music",
  "T-Series",
];

const TopicList = () => {
  const containerRef = useRef(null);
  const [isLeftHidden, setIsLeftHidden] = useState(true);
  const [isRightHidden, setIsRightHidden] = useState(false);

  const handleScroll = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
      updateButtonVisibility();
    }
  };

  const updateButtonVisibility = () => {
    if (containerRef.current) {
      setIsLeftHidden(containerRef.current.scrollLeft === 0);
      setIsRightHidden(
        containerRef.current.scrollLeft + containerRef.current.clientWidth >=
          containerRef.current.scrollWidth
      );
    }
  };

  return (
    <div className={`flex items-center bg-white `}>
      <button
        className={`mr-3 p-3 rounded-full hover:bg-gray-200 ${
          isLeftHidden ? "hidden" : ""
        }`}
        onClick={() => handleScroll(-200)} // Scroll left by 200px
      >
        <BsChevronLeft className="text-md" />
      </button>

      <div
        className="flex overflow-x-hidden relative scroll-smooth"
        ref={containerRef}
        onScroll={updateButtonVisibility}
      >
        <div className="flex gap-x-3">
          {topicListData.map((item, index) => (
            <button
              key={item + index}
              className="px-3 py-2 my-3 rounded-md bg-gray-100 hover:bg-gray-200 focus:bg-black focus:text-white whitespace-nowrap"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button
        className={`ml-3 p-3 rounded-full hover:bg-gray-200 ${
          isRightHidden ? "hidden" : ""
        }`}
        onClick={() => handleScroll(200)} // Scroll right by 200px
      >
        <BsChevronRight className="text-md" />
      </button>
    </div>
  );
};

export default TopicList;
