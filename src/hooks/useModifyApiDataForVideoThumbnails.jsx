import { useEffect, useState, useCallback } from "react";
import useVideoThumbnailUrlModification from "./useVideoThumbnailUrlModification";

const useModifyApiDataForVideoThumbnails = (videoObjArray) => {
  const [modifiedData, setModifiedData] = useState([]);

  const modifyThumbnail = useCallback(async (item) => {
    try {
      const { upscaledVideoThumbnailUrl, fallbackVideoThumbnailUrls } =
        useVideoThumbnailUrlModification(item.thumbnail);

      // Check if the upscaled thumbnail exists by sending a HEAD request
      const response = await fetch(upscaledVideoThumbnailUrl, {
        method: "HEAD",
      });

      if (response.status !== 404) {
        return {
          ...item,
          thumbnail: upscaledVideoThumbnailUrl,
          fallbackThumbnails: fallbackVideoThumbnailUrls,
        };
      } else {
        return {
          ...item,
          fallbackThumbnails: fallbackVideoThumbnailUrls,
        };
      }
    } catch (error) {
      console.error("Error checking 404 status:", error);
      return {
        ...item,
        fallbackThumbnails: fallbackVideoThumbnailUrls,
      };
    }
  }, []);

  useEffect(() => {
    if (videoObjArray.length > 0) {
      const modifyVideos = async () => {
        const modified = await Promise.all(
          videoObjArray.map(async (item) => await modifyThumbnail(item))
        );
        setModifiedData(modified);
      };

      modifyVideos();
    }
  }, [videoObjArray]);

  return modifiedData;
};

export default useModifyApiDataForVideoThumbnails;
