import { useState, useEffect } from "react";
import { PIPED_VIDEO_DETAILS_BY_ID_API } from "../../utils/constants";

const usePipedVideoDetails = (videoId) => {
  const [videoDetails, setVideoDetails] = useState([]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(PIPED_VIDEO_DETAILS_BY_ID_API + videoId);
        const jsonData = await response.json();
        setVideoDetails(jsonData);
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  return videoDetails;
};

export default usePipedVideoDetails;
