import { useSelector } from "react-redux";
import TopicList from "../components/TopicList";
import VideoCard from "../components/Common/VideoCard";
import usePipedTrendingVideos from "../hooks/PipedAPI/usePipedTrendingVideos";
import useModifyApiDataForVideoThumbnails from "../hooks/useModifyApiDataForVideoThumbnails";
import Spinner from "../components/Common/Spinner";

const videoCardType = "vertical";

const Home = () => {
  const isSidebarOpen = useSelector((store) => store.app.isSidebarOpen);

  const trendingVideos = usePipedTrendingVideos();

  const modifiedTrendingVideos =
    useModifyApiDataForVideoThumbnails(trendingVideos);

  return (
    <div className={`${isSidebarOpen ? "lg:ml-[240px]" : "ml-0"} `}>
      <div
        className={`fixed top-[56px] left-4 right-4 z-50 ${
          isSidebarOpen && "lg:left-[256px]"
        }`}
      >
        <TopicList />
      </div>

      {modifiedTrendingVideos.length !== 0 ? (
        <div
          className={`mt-[56px] ${
            videoCardType === "vertical"
              ? "grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-4"
              : "md:grid md:grid-cols-1 md:gap-3 max-sm:flex max-sm:flex-col max-sm:gap-6"
          }`}
        >
          {modifiedTrendingVideos?.map((item, index) => (
            <VideoCard
              key={item + index}
              item={item}
              videoCardType={videoCardType}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center mt-[96px]">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Home;
