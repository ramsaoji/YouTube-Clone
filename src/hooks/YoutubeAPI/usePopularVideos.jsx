import { useState, useEffect } from "react";
import { MOST_POPULAR_VIDEOS_API } from "../../utils/constants";

const usePopularVideos = () => {
  const [popularVideos, setPopularVideos] = useState([]);

  useEffect(() => {
    const fetchPopularVideos = async () => {
      try {
        const response = await fetch(MOST_POPULAR_VIDEOS_API);
        const jsonData = await response.json();
        setPopularVideos(jsonData.items);
      } catch (error) {
        console.error("Error fetching popular videos:", error);
      }
    };

    fetchPopularVideos();
  }, []);

  return popularVideos;
};

export default usePopularVideos;
