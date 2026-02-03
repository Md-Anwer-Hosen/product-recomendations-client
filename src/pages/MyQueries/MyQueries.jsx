import React from "react";
import useAuth from "../../hooks/useAuth";
import useMyQueries from "../../hooks/useMyQueries";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyQueryCard from "../../components/MyQueryCard/MyQueryCard";

const MyQueries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: queries = [],
    isLoading,
    isError,
    refetch,
  } = useMyQueries(user?.email);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this query?");
    if (!ok) return;

    try {
      const res = await axiosSecure.delete(`/queries/${id}`);
      console.log(res);
      refetch(); // tanstack refetch after delete
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

  if (isError)
    return (
      <div className="max-w-md mx-auto mt-20 alert alert-error">
        <span>Failed to load queries</span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {queries.map((q) => (
          <MyQueryCard key={q._id} query={q} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default MyQueries;
