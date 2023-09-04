import { useState, useEffect } from "react";
import { CHANNEL_DETAILS_BY_CHANNEL_ID_API } from "../../utils/constants";

const useChannelDetails = (channelId) => {
  const [channelDetails, setChannelDetails] = useState([]);

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const response = await fetch(
          CHANNEL_DETAILS_BY_CHANNEL_ID_API + channelId
        );
        const jsonData = await response.json();
        setChannelDetails(jsonData.items[0]);
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    };

    fetchChannelDetails();
  }, [channelId]);

  return channelDetails;
};

export default useChannelDetails;
