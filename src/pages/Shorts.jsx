import React from "react";
import { useSelector } from "react-redux";

const Shorts = () => {
  const isSidebarOpen = useSelector((store) => store.app.isSidebarOpen);

  return (
    <div className={`${isSidebarOpen ? "lg:ml-[240px]" : "ml-0"} py-3 lg:px-3`}>
      Shorts! Coming Soon...
    </div>
  );
};

export default Shorts;
