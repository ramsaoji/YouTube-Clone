import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { sidebarOpenClose } from "../utils/slices/appSlice";
import VideoCard from "../components/Common/VideoCard";
import Spinner from "../components/Common/Spinner";
import usePipedSearchQueryResults from "../hooks/PipedAPI/usePipedSearchQueryResults";
import useModifyApiDataForVideoThumbnails from "../hooks/useModifyApiDataForVideoThumbnails";

const videoCardType = "horizontal";

const SearchResults = () => {
  const isSidebarOpen = useSelector((store) => store.app.isSidebarOpen);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const searchQuery = searchParams.get("search_query");

  // When using piped api
  const searchResults = usePipedSearchQueryResults(searchQuery);

  const modifiedSearchResults =
    useModifyApiDataForVideoThumbnails(searchResults);

  useEffect(() => {
    dispatch(sidebarOpenClose({ openOrClose: true }));
  }, [dispatch]);

  return (
    <div
      className={`py-4 max-sm:py-0 ${
        isSidebarOpen ? "lg:ml-[240px]" : "lg:mx-[150px] "
      } max-md:ml-0 flex flex-col gap-4`}
    >
      {modifiedSearchResults.length !== 0 ? (
        <div
          className={`py-6 ${
            videoCardType === "vertical"
              ? "grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-4"
              : "md:grid md:grid-cols-1 md:gap-3 max-sm:flex max-sm:flex-col max-sm:gap-6"
          }`}
        >
          {modifiedSearchResults?.map(
            (item, index) =>
              item.type !== "channel" && (
                <VideoCard
                  key={item + index}
                  item={item}
                  videoCardType={videoCardType}
                />
              )
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center mt-10">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
