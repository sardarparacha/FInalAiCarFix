import React from "react";
import { useSwipeable } from "react-swipeable";

const TabBar = ({ tabs, activeTab, handleTabClick }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextTab(),
    onSwipedRight: () => handlePreviousTab(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      handleTabClick(tabs[currentIndex + 1]);
    }
  };

  const handlePreviousTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      handleTabClick(tabs[currentIndex - 1]);
    }
  };

  return (
    <div
      className="flex space-x-1 rounded-full bg-gray-100 p-1 mb-4 w-full mx-auto max-w-screen-lg overflow-x-auto scrollbar-hide"
      {...handlers}
    >
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(tab)}
          className={`flex-1 whitespace-nowrap px-4 py-2 rounded-full transition-colors duration-200 ${
            activeTab === tab ? "bg-[#011E33] font-semibold text-white" : "text-gray-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
