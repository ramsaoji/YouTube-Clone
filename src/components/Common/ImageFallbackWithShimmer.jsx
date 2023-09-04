import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ImageWithFallbackShimmer = ({ src, fallbackSrc, alt, imgStyle }) => {
  const [currentUrl, setCurrentUrl] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrentUrl(src);
    setLoaded(false);
  }, [src]);

  const handleImageLoadError = () => {
    // If there are fallback sources and the image hasn't loaded yet, switch to the next fallback source.
    if (fallbackSrc && fallbackSrc.length > 0 && !loaded) {
      const nextIndex = fallbackSrc.indexOf(currentUrl) + 1;
      if (nextIndex < fallbackSrc.length) {
        setCurrentUrl(fallbackSrc[nextIndex]);
      }
    }
  };

  return (
    <div className={`relative `}>
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

ImageWithFallbackShimmer.propTypes = {
  src: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.arrayOf(PropTypes.string),
  alt: PropTypes.string,
  imgStyle: PropTypes.string,
};

export default ImageWithFallbackShimmer;
