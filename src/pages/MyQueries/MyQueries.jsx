import React from "react";
import useAuth from "../../hooks/useAuth";
import useMyQueries from "../../hooks/useMyQueries";

const MyQueries = () => {
  const { user } = useAuth();

  const { data = [], isLoading, isError } = useMyQueries(user?.email);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

  if (isError)
    return (
      <div className="max-w-md mx-auto mt-20 alert alert-error">
        <span>Failed to load applications</span>
      </div>
    );

  return (
    <div>
      {data.map((d) => {
        <p key={d._id}>{d.productName}</p>;
      })}
    </div>
  );
};

export default MyQueries;
