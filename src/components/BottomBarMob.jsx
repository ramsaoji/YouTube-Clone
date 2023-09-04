import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BsCollectionPlay } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";

const BottomBarMob = () => {
  const activeNavLink =
    "max-sm:w-auto md:w-[192px] flex flex-col justify-center items-center gap-1 rounded-lg font-bold";
  const inActiveNavLink =
    "max-sm:w-auto md:w-[192px] flex flex-col justify-center items-center gap-1 rounded-lg";
  return (
    <div className="w-full h-[56px] px-4 lg:hidden md:flex max-sm:flex justify-between fixed bottom-0 bg-white z-[100]">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
        }
      >
        <GoHome className="h-5 w-5" />
        <div className="text-xs">Home</div>
      </NavLink>

      <NavLink
        to="/shorts"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
        }
      >
        <AiOutlinePlayCircle className=" h-5 w-5" />
        <div className="text-xs">Shorts</div>
      </NavLink>

      <NavLink
        to="/subscriptions"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
        }
      >
        <BsCollectionPlay className=" h-5 w-5" />
        <div className="text-xs">Subscriptions</div>
      </NavLink>

      <NavLink
        to="/library"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? activeNavLink : inActiveNavLink
        }
      >
        <MdOutlineVideoLibrary className=" h-5 w-5" />
        <div className="text-xs">Library</div>
      </NavLink>
    </div>
  );
};

export default BottomBarMob;
