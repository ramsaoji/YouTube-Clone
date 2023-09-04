import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { convertToPublishedAgo, formatCount } from "../utils/commonFn";
import RetryImage from "../components/Common/RetryImage";
import useVideoThumbnailUrlModification from "../hooks/useVideoThumbnailUrlModification";
import ImageWithFallbackShimmer from "./Common/ImageFallbackWithShimmer";

const VideoCardRecommendation = ({ item }) => {
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
  } = item;

  const videoId = url.split("/watch?v=")[1];
  const channelId = uploaderUrl.split("/channel/")[1];
  const formatedViewCount = formatCount(viewCount);

  // // When using youtube api
  // const { id: videoId = "", snippet = {}, statistics = {} } = item;
  // const {
  //   title: videoTitle = "",
  //   // channelId = "",
  //   channelTitle = "",
  //   channelThumbnailUrl = "",
  //   publishedAt = "",
  //   thumbnails: videoThumbnails = {},
  // } = snippet;
  // const { viewCount = "" } = statistics;

  // const formatedViewCount = formatCount(viewCount);
  // const publishedAtText = convertToPublishedAgo(publishedAt);
  // const videoThumbnailUrl = videoThumbnails?.medium?.url || "";

  return (
    <div id="video-cards-recommendations">
      <div className="lg:grid lg:grid-cols-12 md:flex md:flex-col">
        {/* Video Thumbnail */}
        <div className="lg:col-span-6 ">
          <Link to={`/watch?v=${videoId}`} state={{ channelId, videoTitle }}>
            <ImageWithFallbackShimmer
              src={videoThumbnailUrl} // Primary image source
              fallbackSrc={fallbackThumbnails} // Fallback image source
              alt="Video Thumbnail"
              imgStyle="max-sm:w-full rounded-xl"
            />
          </Link>
        </div>
        {/* Video Info*/}
        <div className="lg:col-span-6 grid grid-cols-[auto,1fr] gap-3 md:pt-2 max-sm:pt-2">
          {/* Channel Icon */}
          <div className="lg:hidden md:block max-sm:block">
            <ImageWithFallbackShimmer
              src={channelThumbnailUrl} // Primary image source
              alt="Icon"
              imgStyle="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full"
            />
          </div>

          <div className="px-2 lg:overflow-visible max-sm:overflow-hidden md:overflow-hidden">
            {/* Video Title */}
            <p className="mb-1 text-sm font-medium line-clamp-2 leading-snug">
              {videoTitle}
            </p>
            {/* Channel Title */}
            <div>
              <div className="flex items-center">
                <p className="flex-shrink-0 text-sm text-gray-600 mr-1">
                  {channelTitle}
                </p>
                <span className="flex-shrink-0">
                  <AiFillCheckCircle className="text-sm text-gray-500" />
                </span>
              </div>

              {/* Views Count */}
              <div className="flex items-center">
                <p className="text-sm text-gray-600 mr-1">
                  {formatedViewCount && `${formatedViewCount} views`}
                  {`${formatCount && publishedAtText ? " • " : ""} `}
                  {publishedAtText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardRecommendation;
