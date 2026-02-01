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
    ],
  },
]);

export default router;
