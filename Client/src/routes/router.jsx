import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailPage from "../pages/DetailPage";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MyList from "../pages/MyList";
import Gemini from "../pages/Gemini";
const router = createBrowserRouter([
  {
    element: (
      <GoogleOAuthProvider clientId="774306274704-3bks81rvutdpgkplgcn865nlkhr8qq5h.apps.googleusercontent.com">
        <Outlet />
      </GoogleOAuthProvider>
    ),
  },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/gemini", element: <Gemini /> },
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":explore",
        element: <ExplorePage />,
      },
      {
        path: ":explore/:id",
        element: <DetailPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "/mylist",
        element: <MyList />,
      },
    ],
  },
]);

export default router;
