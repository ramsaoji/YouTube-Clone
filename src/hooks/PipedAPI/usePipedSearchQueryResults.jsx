import { useState, useEffect } from "react";
import { PIPED_SEARCH_QUERY_RESULTS_API } from "../../utils/constants";

const usePipedSearchQueryResults = (searchQuery) => {
  const [searchQueryData, setSearchQueryData] = useState([]);

  useEffect(() => {
    const getSearchQueryResults = async () => {
      try {
        const response = await fetch(
          `${PIPED_SEARCH_QUERY_RESULTS_API}q=${searchQuery}&filter=all`
        );
        const jsonData = await response.json();
        setSearchQueryData(jsonData.items);
      } catch (error) {
        console.error("Error fetching search query results:", error);
      }
    };

    getSearchQueryResults();
  }, [searchQuery]);

  return searchQueryData;
};

export default usePipedSearchQueryResults;
