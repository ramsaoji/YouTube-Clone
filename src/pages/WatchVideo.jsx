import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { sidebarOpenClose } from "../utils/slices/appSlice";
import { formatCount } from "../utils/commonFn";
import ImageWithFallbackShimmer from "../components/Common/ImageFallbackWithShimmer";
import RelatedVideos from "../components/RelatedVideos";
import TopicList from "../components/TopicList";
import Spinner from "../components/Common/Spinner";
import usePipedVideoDetails from "../hooks/PipedAPI/usePipedVideoDetails";

const WatchVideo = () => {
  const dispatch = useDispatch();
  const [searhParams] = useSearchParams();
  const videoId = searhParams.get("v");

  // const location = useLocation();
  // const {
  //   state: { channelId = ""},
  // } = location; // Extract the state object from location

  // if (!channelId ) {
  //   return null;
  // }

  //  When using piped api
  // const channelDetails = usePipedChannelDetails(channelId);

  // const {
  //   name: channelTitle = "",
  //   avatarUrl: channelThumbnailUrl = "",
  //   subscriberCount = "",
  // } = channelDetails;

  //Get Video Details -
  const videoDetails = usePipedVideoDetails(videoId);

  const {
    title: videoTitle = "",
    uploader: channelTitle = "",
    uploaderAvatar: channelThumbnailUrl = "",
    uploaderSubscriberCount: subscriberCount = "",
    likes = "",
    dislikes = "",
    relatedStreams = [],
  } = videoDetails;

  if (!videoDetails) {
    return null; // Handle cases where there's no state or thumbnailUrl
  }

  const formatedSubscriberCount = formatCount(subscriberCount);
  const formatedLikesCount = formatCount(likes);
  const formatedDislikesCount = formatCount(dislikes);

  useEffect(() => {
    dispatch(sidebarOpenClose({ openOrClose: false }));
  }, [dispatch]);

  return Object.keys(videoDetails).length !== 0 ? (
    <div className="grid lg:grid-cols-12 md:grid-cols-1 max-sm:grid-cols-1 lg:p-4 overflow-hidden">
      <div className="lg:col-span-8 lg:px-2 ">
        {/* Video iframe */}
        <div className="w-full lg:h-[450px] md:h-[450px] max-sm:h-[230px] lg:static md:fixed md:top-[56px] md:right-0 max-sm:fixed max-sm:top-[56px] max-sm:right-0 z-10">
          <iframe
            className="w-full h-full "
            src={`https://www.youtube.com/embed/${videoId}?si=3_tVIPwPEige5P9E`}
            title="YouTube video player"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="py-3 max-sm:bg-white lg:mt-0 md:mt-[438px] max-sm:mt-[218px]">
          {/* Video Title */}
          <h1 className="mb-3 text-lg max-sm:text-base overflow-hidden text-ellipsis font-semibold">
            {videoTitle}
          </h1>

          {/* Video Info */}
          <div className="flex md:flex-row md:justify-between md:items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex md:items-center md:gap-10">
              <div className="flex items-center gap-2 ">
                {/* Channel Icon */}
                <div className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px]">
                  <ImageWithFallbackShimmer
                    src={channelThumbnailUrl} // Primary image source
                    alt="Image Description"
                    imgStyle="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col md:w-[240px] max-sm:full">
                  {/* Channel Name */}
                  {/* <div className="flex items-center">
                    <p className="text-lg max-sm:text-base font-semibold text-gray-800 mr-1">
                      {channelTitle}
                    </p>
                    <AiFillCheckCircle className="text-sm text-gray-500" />
                  </div> */}
                  <h3 className="text-base text-gray-800 font-semibold line-clamp-1">
                    <span className="">{channelTitle}</span>
                    <AiFillCheckCircle className="ml-2 text-gray-500 inline-block " />
                  </h3>
                  {/* Subscribers Count */}
                  <div className="flex items-center">
                    <p className="text-sm text-gray-600 mr-1">
                      {formatedSubscriberCount &&
                        `${formatedSubscriberCount} subscribers`}
                    </p>
                  </div>
                </div>
              </div>
              {/* Subscribe Btn only for medium and lagrge screens */}
              <div className="px-4 py-2 flex items-center justify-center text-sm font-semibold text-gray-200 bg-gray-900 rounded-full max-sm:hidden">
                Subscribe
              </div>
            </div>

            {/* Like Dislike */}
            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-3">
                  <BiSolidLike className="text-xl text-gray-500" />
                  <p className=" text-base max-sm:text-sm font-medium text-gray-800 mr-1">
                    {formatedLikesCount}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <BiSolidDislike className="text-xl text-gray-500" />
                  <p className="text-base max-sm:text-sm font-medium text-gray-800 mr-1">
                    {formatedDislikesCount}
                  </p>
                </div>
              </div>
              {/* Subscribe Btn only for small screens */}
              <div className="px-3 py-2 flex items-center justify-center text-xs font-semibold text-gray-200 bg-gray-900 rounded-full md:hidden">
                Subscribe
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Sidebar RightSide */}
      <div className="lg:pl-4 lg:col-span-4">
        <RelatedVideos relatedStreams={relatedStreams} />
      </div>
    </div>
  ) : (
    <div className="w-full flex justify-center items-center mt-5">
      <Spinner />
    </div>
  );
};

export default WatchVideo;
