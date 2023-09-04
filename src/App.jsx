import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Shorts from "./pages/Shorts";
import WatchVideo from "./pages/WatchVideo";
import SearchResults from "./pages/SearchResults";
import Body from "./components/Body";
import Header from "./components/Header";
import store from "./utils/store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: [<Header key="header" />, <Body key="body" />],
      errorElement: [<Header key="header" />, <ErrorPage key="error" />],
      children: [
        {
          index: true,
          element: <Home key="home" />,
        },
        {
          path: "/results",
          element: <SearchResults key="results" />,
        },
        {
          path: "/watch",
          element: <WatchVideo key="watch" />,
        },
        {
          path: "/shorts",
          element: <Shorts key="shorts" />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
