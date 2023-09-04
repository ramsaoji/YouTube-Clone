import { useState, useEffect } from "react";
import { CHANNEL_THUMBNAIL_BY_CHANNEL_ID_API } from "../../utils/constants";

const useChannelThumbnails = (popularVideos) => {
  const [updatedVideos, setUpdatedVideos] = useState(popularVideos);

  useEffect(() => {
    const fetchChannelThumbnails = async () => {
      try {
        const uniqueChannelIds = popularVideos.map(
          (item) => item.snippet.channelId
        );
        const response = await fetch(
          CHANNEL_THUMBNAIL_BY_CHANNEL_ID_API + uniqueChannelIds.join(",")
        );
        const jsonData = await response.json();

        const channelThumbnailsUrlsObj = jsonData?.items?.reduce(
          (acc, item) => {
            acc[item.id] = item?.snippet?.thumbnails?.medium?.url;
            return acc;
          },
          {}
        );

        const updatedVideos = popularVideos.map((item) => {
          if (channelThumbnailsUrlsObj.hasOwnProperty(item.snippet.channelId)) {
            return {
              ...item,
              snippet: {
                ...item.snippet,
                channelThumbnailUrl:
                  channelThumbnailsUrlsObj[item.snippet.channelId],
              },
            };
          }
          return item;
        });

        setUpdatedVideos(updatedVideos);
      } catch (error) {
        console.error("Error fetching channel thumbnails:", error);
      }
    };

    fetchChannelThumbnails();
  }, [popularVideos]);

  return updatedVideos;
};

export default useChannelThumbnails;
