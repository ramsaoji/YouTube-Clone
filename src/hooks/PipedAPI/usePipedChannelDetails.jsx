import { useState, useEffect } from "react";
import { PIPED_CHANNEL_DETAILS_BY_CHANNEL_ID_API } from "../../utils/constants";

const usePipedChannelDetails = (channelId) => {
  const [channelDetails, setChannelDetails] = useState({});

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const response = await fetch(
          PIPED_CHANNEL_DETAILS_BY_CHANNEL_ID_API + channelId
        );
        const jsonData = await response.json();
        setChannelDetails(jsonData);
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    };

    fetchChannelDetails();
  }, [channelId]);

  return channelDetails;
};

export default usePipedChannelDetails;
