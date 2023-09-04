import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcMenu } from "react-icons/fc";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillMicFill } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { sidebarOpenClose, toggleSidebar } from "../utils/slices/appSlice";
import SearchSuggestions from "./SearchSuggestions";
import usePipedSearchSuggestions from "../hooks/PipedAPI/usePipedSearchSuggestions";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // // When using youtube api
  // const searchSuggestions = useSearchSuggestions(searchInput, 200);

  // // When using piped api
  const searchSuggestions = usePipedSearchSuggestions(searchInput, 200);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      console.log("searchInput - ", searchInput);
      navigate(`/results?search_query=${searchInput}`);
    }
  };

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleYTLogoClick = () => {
    dispatch(sidebarOpenClose({ openOrClose: true }));
    setIsMobileSearch(false);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setIsSearchOnFocus(true);

    // Focus on the input element after a short delay
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  return (
    <div className="h-14 py-0 px-[16px] flex justify-between items-center sticky top-0 bg-white z-[100]">
      {/* Sidebar Btn & YT-Logo */}

      <div
        className={`flex items-center max-sm:${isMobileSearch ? "hidden" : ""}`}
      >
        <FcMenu
          className="h-[40px] w-[40px] p-[8px] cursor-pointer rounded-full hover:bg-gray-200 max-lg:hidden select-none"
          onClick={handleSidebar}
        />
        <NavLink to="/" onClick={handleYTLogoClick}>
          <img
            className="h-[40px] w-[90px] ml-[16px] mr-[14px] max-lg:ml-0 select-none focus:outline-none border-0"
            src="./YouTube-Logo.svg"
            alt="youtube-logo"
          />
        </NavLink>
      </div>
      <div className={`hidden max-sm:${isMobileSearch ? "block" : "hidden"}`}>
        <NavLink to="/" onClick={handleYTLogoClick}>
          <img
            className="h-[40px] w-[40px] ml-[16px] mr-[14px] max-lg:ml-0 select-none"
            src="./YouTube-Mob-Logo.svg"
            alt="youtube-logo"
          />
        </NavLink>
      </div>

      {/* Input,Search and Mic Btn */}
      <div
        className={`flex max-sm:${
          !isMobileSearch ? "hidden" : "w-full"
        } xl:w-[732px] lg:w-[632px] md:w-[532px]`}
      >
        <div className=" flex-1 mx-1 flex justify-end">
          <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="flex items-center justify-between">
              {isSearchOnFocus ? (
                <div
                  className={`h-[40px] py-2 pl-4 text-center rounded-l-full 
                ${
                  isSearchOnFocus
                    ? "border border-r-0 border-blue-600"
                    : "border border-r-0 border-gray-300"
                }
                
                `}
                >
                  <IoSearchOutline className="w-[20px] h-[20px] select-none " />
                </div>
              ) : (
                <div className="w-[37px] max-sm:w-0"></div>
              )}

              <input
                type="text"
                id="search-input"
                ref={inputRef} // Reference the input element
                className={`h-[40px] w-full p-2 pl-4 placeholder-gray-500 border border-r-0 ${
                  isSearchOnFocus
                    ? "border-l-0 border-blue-600"
                    : "border-gray-300 rounded-l-full"
                }  focus:outline-none focus:bg-white `}
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => {
                  setIsSearchOnFocus(true);
                }}
                onBlur={() => {
                  setIsSearchOnFocus(false);
                }}
              />
              {/* Input Clear Button */}
              {searchInput && (
                <div className="cursor-pointer rounded-full hover:bg-gray-200">
                  <div
                    className={`h-[40px] p-2 border-t border-b ${
                      isSearchOnFocus ? "border-blue-600 " : "border-gray-300"
                    }`}
                    onMouseDown={handleClearSearch}
                  >
                    <VscChromeClose className="w-[20px] h-[20px] text-end select-none" />
                  </div>
                </div>
              )}
            </div>

            {/* Search Suggestions Box*/}
            {isSearchOnFocus && searchSuggestions.length !== 0 && (
              <SearchSuggestions
                searchSuggestions={searchSuggestions}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            )}
          </form>

          <button
            type="submit"
            className={`h-full w-[64px] px-[6px] flex justify-center items-center bg-gray-100 border border-gray-300 ${
              isSearchOnFocus && "border-l-blue-600 shadow-sm"
            }  hover:bg-gray-200 rounded-r-full`}
            onClick={handleFormSubmit}
          >
            <IoSearchOutline className="w-[20px] h-[20px] select-none " />
          </button>
        </div>

        {/* Mic Logo */}
        <div className="h-full cursor-pointer max-sm:hidden">
          <BsFillMicFill className="h-10 w-10 p-3 ml-3 bg-gray-100 hover:bg-gray-200 rounded-full select-none" />
        </div>
      </div>

      {/* User Logo */}
      <div
        className={`flex items-center justify-end max-sm:${
          isMobileSearch ? "hidden" : ""
        }`}
      >
        {/* Hidden Search Button only for mobile view*/}
        <button
          className="max-sm:block hidden pr-4 h-full"
          onClick={() => setIsMobileSearch(true)}
        >
          <IoSearchOutline className="text-2xl" />
        </button>
        <img className="h-8 rounded-full" src="./user.jpg" alt="user-logo" />
      </div>
    </div>
  );
};

export default Header;
