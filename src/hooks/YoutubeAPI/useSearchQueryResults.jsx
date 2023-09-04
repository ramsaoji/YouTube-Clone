import { useState, useEffect } from "react";
import { SEARCH_QUERY_RESULTS_API } from "../../utils/constants";

const useSearchQueryResults = (searchQuery) => {
  const [searchQueryData, setSearchQueryData] = useState([]);

  useEffect(() => {
    const getSearchQueryResults = async () => {
      try {
        const response = await fetch(SEARCH_QUERY_RESULTS_API + searchQuery);
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

export default useSearchQueryResults;
