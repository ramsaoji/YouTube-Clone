const useVideoThumbnailUrlModification = (initialUrl) => {
  // Replace "hqdefault" with "hq720" in the URL
  const upscaledVideoThumbnailUrl = initialUrl.replace("hqdefault", "hq720");

  // Create fallback URLs with "hqdefault" and "mqdefault"
  const fallbackVideoThumbnailUrls = [
    initialUrl, // "hqdefault" fallback
    // initialUrl.replace("hqdefault", "mqdefault"), // "mqdefault" fallback
  ];

  return {
    upscaledVideoThumbnailUrl,
    fallbackVideoThumbnailUrls,
  };
};

export default useVideoThumbnailUrlModification;
