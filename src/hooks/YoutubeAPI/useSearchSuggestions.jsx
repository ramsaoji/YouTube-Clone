import { useState, useEffect } from "react";
import { SEARCH_SUGGESTIONS_API } from "../../utils/constants";
import useDebounceInputValue from "../useDebounceInputValue";

export const useSearchSuggestions = (searchInput, delay) => {
  const debouncedSearchInput = useDebounceInputValue(searchInput, delay);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    const fetchSearchSuggestions = async () => {
      try {
        const response = await fetch(
          SEARCH_SUGGESTIONS_API + debouncedSearchInput
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setSearchSuggestions(jsonData[1]);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    if (searchInput !== "") {
      fetchSearchSuggestions();
    } else {
      setSearchSuggestions([]);
    }
  }, [debouncedSearchInput]);

  return searchSuggestions;
};

export default useSearchSuggestions;
