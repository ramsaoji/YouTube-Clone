import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchSuggestions = ({
  searchSuggestions,
  searchInput,
  setSearchInput,
}) => {
  // console.log("searchSuggestions - ", searchSuggestions);
  const navigate = useNavigate();

  const handleSearchItemClick = (e) => {
    const liElement = e.target.closest("li"); // Find the closest ancestor <li> element
    if (liElement) {
      const item = liElement.textContent.trim();
      setSearchInput(item);
      if (searchInput) {
        navigate(`/results?search_query=${item}`);
      }
    }
  };

  return (
    <ul
      className="w-[280px] xl:w-[615px] lg:w-[515px] md:w-[415px] py-2 fixed top-[52px] bg-white rounded-xl shadow-sm shadow-gray-600 z-50"
      onMouseDown={(e) => handleSearchItemClick(e)}
    >
      {searchSuggestions?.map((item, index) => {
        const matchingPart = item.startsWith(searchInput.toLowerCase())
          ? searchInput.toLowerCase()
          : "";
        const remainingPart = item.slice(matchingPart.length) || "";

        return (
          <li
            key={item + index}
            className="flex items-center text-lg py-1 px-4 hover:bg-gray-200 cursor-pointer select-none"
          >
            <IoSearchOutline className="w-[20px] h-[20px] select-none" />

            <p className="flex-1 pl-4 text-base ">
              <span>{matchingPart}</span>
              <span className="font-medium ">{remainingPart}</span>
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchSuggestions;
