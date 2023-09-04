import React, { useState, useEffect } from "react";

const RetryImage = ({ src, fallbackSrc, alt, imgStyle }) => {
  const [currentFallbackIndex, setCurrentFallbackIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrentUrl(src);
    setLoaded(false);
    setCurrentFallbackIndex(0);
  }, [src, fallbackSrc]);

  const handleImageLoadError = () => {
    // If the current fallback index is within the bounds of the array,
    // switch to the next fallback image source.
    if (currentFallbackIndex < fallbackSrc.length - 1) {
      const nextIndex = currentFallbackIndex + 1;
      setCurrentUrl(fallbackSrc[nextIndex]);
      setCurrentFallbackIndex(nextIndex);
    }
  };

  return (
    <div className={`relative ${imgStyle}`}>
      <div
        className={`${imgStyle} absolute inset-0 bg-gradient-to-r animate-pulse from-gray-200 via-gray-300 to-gray-200 ${
          loaded ? "hidden" : ""
        }`}
      />
      <img
        className={`${imgStyle} ${loaded ? "" : "opacity-0"}`}
        src={currentUrl}
        alt={alt}
        onLoad={() => {
          setLoaded(true);
        }}
        onError={() => {
          handleImageLoadError();
        }}
      />
    </div>
  );
};

export default RetryImage;
