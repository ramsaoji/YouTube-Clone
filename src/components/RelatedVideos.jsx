import VideoCardRecommendation from "./VideoCardRecommendation";
import Spinner from "./Common/Spinner";
import useModifyApiDataForVideoThumbnails from "../hooks/useModifyApiDataForVideoThumbnails";

const RelatedVideos = ({ relatedStreams }) => {
  if (relatedStreams.length < 0) {
    return null;
  }

  const modifiedRelatedStreams =
    useModifyApiDataForVideoThumbnails(relatedStreams);

  return (
    <>
      {modifiedRelatedStreams?.length !== 0 ? (
        <div className="lg:grid-cols-1 md:grid md:grid-cols-3 lg:gap-3 max-sm:flex max-sm:flex-col max-sm:gap-4 md:gap-x-4 md:gap-y-6 lg:my-0 md:pl-0 md:my-4 max-sm:my-4 max-sm:p-0 ">
          {modifiedRelatedStreams?.slice(0, 10)?.map((item, index) => {
            return <VideoCardRecommendation key={item + index} item={item} />;
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center mt-5">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default RelatedVideos;
