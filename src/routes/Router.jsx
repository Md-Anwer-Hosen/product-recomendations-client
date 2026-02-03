import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import AllQueries from "../pages/AllQueries/AllQueries";
import QueriesDetails from "../pages/QueriesDetails/QueriesDetails";
import AddQueryForm from "../pages/AddQueryForm/AddQueryForm";
import PrivetRoute from "./PrivetRoute";
import MyQueries from "../pages/MyQueries/MyQueries";
import UpdateQuery from "../pages/UpdateQuery/UpdateQuery";
import MyRecommendations from "../pages/MyRecommendations/MyRecommendations";
import RecommendationsForMe from "../pages/RecommendationsForMe/RecommendationsForMe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "queries",
        element: <AllQueries />,
      },
      {
        path: "queries/:id",
        element: <QueriesDetails />,
      },
      {
        path: "addQueries",
        element: (
          <PrivetRoute>
            <AddQueryForm />
          </PrivetRoute>
        ),
      },
      {
        path: "myQueries",
        element: (
          <PrivetRoute>
            <MyQueries />
          </PrivetRoute>
        ),
      },
      {
        path: "updateQuery/:id",
        element: (
          <PrivetRoute>
            <UpdateQuery />
          </PrivetRoute>
        ),
      },

      {
        path: "myRecommendations",
        element: <MyRecommendations />,
      },
      {
        path: "recommendationForMe",
        element: (
          <PrivetRoute>
            <RecommendationsForMe />
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
