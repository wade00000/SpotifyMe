import App from "./App";
import PopularityRankings from "./pages/PopularityRankings";
import TopTracks from "./pages/TopTracks";
import TopArtists from "./pages/TopArtists";
import TopGenres from "./pages/TopGenres";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage"; // <-- import it
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "popularity",
        element: <PopularityRankings />,
      },
      {
        path: "top/tracks",
        element: <TopTracks />,
      },
      {
        path: "top/genres",
        element: <TopGenres />,
      },
      {
        path: "top/artists",
        element: <TopArtists />,
      },
    ],
  },
];


export default routes;
