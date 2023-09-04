import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { convertToPublishedAgo, formatCount } from "../../utils/commonFn";
import ImageWithFallbackShimmer from "./ImageFallbackWithShimmer";

const VideoCard = ({ item, videoCardType = "vertical" }) => {
  // When using piped api
  const {
    url = "",
    title: videoTitle = "",
    thumbnail: videoThumbnailUrl = "",
    fallbackThumbnails = [],
    uploaderUrl = "",
    uploaderName: channelTitle = "",
    uploaderAvatar: channelThumbnailUrl = "",
    uploadedDate: publishedAtText = "",
    views: viewCount = "",
    shortDescription: description = "",
  } = item;

  const videoId = url.split("/watch?v=")[1];
  const channelId = uploaderUrl.split("/channel/")[1];
  const formatedViewCount = formatCount(viewCount);

  return (
    // Card Container
    <div
      className={
        videoCardType === "horizontal"
          ? "md:grid md:grid-cols-12 md:gap-3 max-sm:flex max-sm:flex-col max-sm:gap-3"
          : "flex flex-col gap-3"
      }
    >
      {/* Common Video Thumbnail */}
      <div className={videoCardType === "horizontal" ? "md:col-span-4 " : ""}>
        <Link to={`/watch?v=${videoId}`} state={{ channelId, videoTitle }}>
          <ImageWithFallbackShimmer
            src={videoThumbnailUrl} // Primary image source
            fallbackSrc={fallbackThumbnails} // Fallback image source
            alt="Video Thumbnail"
            imgStyle="w-full h-full rounded-xl"
          />
        </Link>
      </div>
      {/* Video All Info */}
      {videoCardType === "vertical" ? (
        //Vertical Video Info
        <div className="flex gap-2">
          {/* Channel Thumbnail only for medium and large screens*/}
          <div className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px]">
            <ImageWithFallbackShimmer
              src={channelThumbnailUrl} // Primary image source
              alt="Icon"
              imgStyle="w-full h-full rounded-full"
            />
          </div>

          {/* Video Description */}
          <div className="flex flex-col gap-2 overflow-hidden">
            {/* Video Title */}
            <h1 className="font-medium text-gray-800  text-ellipsis line-clamp-2 leading-tight">
              {videoTitle}
            </h1>

            {/* Channel Title & Views Container */}
            <div className="flex flex-col gap-1">
              {/* Channel Title */}
              <h3 className="text-sm text-gray-800 line-clamp-2 leading-tight">
                <span>{channelTitle}</span>
                <AiFillCheckCircle className="ml-2 text-gray-500 inline-block align-middle" />
              </h3>

              {/* Views, Published Text */}
              <h2 className="text-sm text-gray-600 ">
                {formatedViewCount && `${formatedViewCount} views`}
                {`${formatedViewCount && publishedAtText ? " • " : ""}`}
                {publishedAtText}
                {/* 56.5 lakh views • 1 day ago */}
              </h2>
            </div>
          </div>
        </div>
      ) : (
        //Horizontal Video Info
        <div className="md:col-span-6 max-sm:flex max-sm:gap-2">
          {/* Channel Thumbnail only for small screens*/}
          <div className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] hidden max-sm:block ">
            <ImageWithFallbackShimmer
              src={channelThumbnailUrl} // Primary image source
              alt="Icon"
              imgStyle="w-full h-full rounded-full"
            />
          </div>

          {/* Video Description */}
          <div className="flex flex-col gap-2">
            {/* Video Title */}
            <h1 className="font-medium text-gray-800 line-clamp-2 leading-tight">
              {videoTitle}
            </h1>
            {/* Views Container */}
            <div className="flex flex-col gap-2">
              <h2 className="text-sm text-gray-600 ">
                {formatedViewCount && `${formatedViewCount} views`}
                {`${formatedViewCount && publishedAtText ? " • " : ""}`}
                {publishedAtText}
                {/* 56.5 lakh views • 1 day ago */}
              </h2>
              <div className="flex items-center gap-2">
                {/* Channel Thumbnail only for large and medium screens*/}
                <div className="min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] max-sm:hidden">
                  <ImageWithFallbackShimmer
                    src={channelThumbnailUrl} // Primary image source
                    alt="Icon"
                    imgStyle="w-full h-full rounded-full"
                  />
                </div>
                {/* Channel Title */}
                <h3 className="text-sm text-gray-800 line-clamp-2 leading-tight">
                  <span>{channelTitle}</span>
                  <AiFillCheckCircle className="ml-2 text-gray-500 inline-block align-middle" />
                </h3>
              </div>
              {/* Description */}
              {description && (
                <h2 className="hidden md:block text-xs text-gray-600 line-clamp-2 leading-tight">
                  {description}
                </h2>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
