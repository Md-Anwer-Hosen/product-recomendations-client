import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black">
        <span className="loading loading-ring loading-xl text-black"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/signIn"} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivetRoute;
