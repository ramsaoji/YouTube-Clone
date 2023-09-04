import { useState, useEffect } from "react";
import { PIPED_TRENDING_VIDEOS_API } from "../../utils/constants";

const usePipedTrendingVideos = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        const response = await fetch(PIPED_TRENDING_VIDEOS_API);
        const jsonData = await response.json();
        setTrendingVideos(jsonData);
      } catch (error) {
        console.error("Error fetching popular videos:", error);
      }
    };

    fetchTrendingVideos();
  }, []);

  return trendingVideos;
};

export default usePipedTrendingVideos;
