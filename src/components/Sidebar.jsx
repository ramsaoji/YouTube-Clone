import React from "react";
import { GoHome } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BsCollectionPlay } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { CgPlayButtonR } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isSidebarOpen = useSelector((store) => store.app.isSidebarOpen);

  const activeNavLink =
    "h-10 p-3 flex items-center rounded-lg font-semibold bg-gray-100 hover:bg-gray-200";
  const inActiveNavLink =
    "h-10 p-3 flex items-center rounded-lg hover:bg-gray-200";

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <div className="w-[240px] max-lg:hidden p-3 mt-[56px] fixed left-0 top-0 bottom-0 bg-white z-50">
      <div className="flex flex-1 flex-col pr-3 ">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
          }
        >
          <GoHome className="h-6 w-6 mr-6 text-gray-800" />
          <div>Home</div>
        </NavLink>

        <NavLink
          to="/shorts"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
          }
        >
          <AiOutlinePlayCircle className=" h-6 w-6 mr-6 text-gray-800" />
          <div>Shorts</div>
        </NavLink>

        <NavLink
          to="/subscriptions"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
          }
        >
          <BsCollectionPlay className=" h-6 w-6 mr-6 text-gray-800" />
          <div>Subscriptions</div>
        </NavLink>

        <hr className="my-3" />

        <NavLink
          to="/library"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
          }
        >
          <MdOutlineVideoLibrary className=" h-6 w-6 mr-6 text-gray-800" />
          <div>Library</div>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
          }
        >
          <MdHistory className=" h-6 w-6 mr-6 text-gray-800" />
          <div>History</div>
        </NavLink>

        <NavLink
          to="/yourVideos"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
          }
        >
          <CgPlayButtonR className=" h-6 w-6 mr-6 text-gray-800" />
          <div>Your Videos</div>
        </NavLink>

        <NavLink
          to="/watchLater"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
          }
        >
          <MdOutlineWatchLater className=" h-6 w-6 mr-6 text-gray-800" />
          <div>Watch Later</div>
        </NavLink>

        <NavLink
          to="/likedVideos"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
          }
        >
          <BiLike className=" h-6 w-6 mr-6 text-gray-800" />
          <div>Liked Videos</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
