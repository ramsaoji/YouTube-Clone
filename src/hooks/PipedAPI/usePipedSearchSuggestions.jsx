import { useState, useEffect } from "react";
import { PIPED_SEARCH_SUGGESTIONS_API } from "../../utils/constants";
import useDebounceInputValue from "../useDebounceInputValue";

const usePipedSearchSuggestions = (searchInput, delay) => {
  const debouncedSearchInput = useDebounceInputValue(searchInput, delay);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    const fetchSearchSuggestions = async () => {
      try {
        const response = await fetch(
          PIPED_SEARCH_SUGGESTIONS_API + debouncedSearchInput
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setSearchSuggestions(jsonData);
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

export default usePipedSearchSuggestions;
