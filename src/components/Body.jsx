import BottomBarMob from "./BottomBarMob";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* All Pages - Main Content */}
      <div
        className={`flex-1 px-[16px] py-3 lg:mb-0 md:mb-[56px] max-sm:mb-[56px]`}
      >
        <Outlet />
      </div>
      {/* For Mobile and Tab */}
      <BottomBarMob />
    </div>
  );
};

export default Body;
