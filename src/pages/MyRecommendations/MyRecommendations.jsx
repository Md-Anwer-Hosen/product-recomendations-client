// src/pages/MyRecommendations/MyRecommendations.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiExternalLink, FiSearch } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMyRecommendations from "../../hooks/useMyRecommendations";

const MyRecommendations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [deletingId, setDeletingId] = useState(null);

  const {
    data: recs = [],
    isLoading,
    isError,
    refetch,
  } = useMyRecommendations(user?.email);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this recommendation?");
    if (!ok) return;

    try {
      setDeletingId(id);
      await axiosSecure.delete(`/recommendations/${id}`);
      await refetch();
    } catch (err) {
      console.log(err);
      alert("Failed to delete recommendation!");
    } finally {
      setDeletingId(null);
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
        <span>Failed to load recommendations</span>
      </div>
    );

  if (!recs.length)
    return (
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-[#863efa]/10 grid place-items-center">
            <FiSearch className="text-2xl text-[#863efa]" />
          </div>
          <h3 className="mt-4 text-lg font-extrabold text-slate-900">
            No recommendations yet
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Browse queries and add recommendations to help others.
          </p>
          <Link
            to="/queries"
            className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#863efa] text-white font-semibold hover:opacity-90 transition"
          >
            Go to Queries
          </Link>
        </div>
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#863efa]/10 text-[#863efa] text-xs font-semibold">
            My Recommendations
          </p>
          <h1 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
            Recommendations you’ve made
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            You can delete a recommendation, but you can’t edit it.
          </p>
        </div>
        <div className="text-sm text-slate-600">
          Total:{" "}
          <span className="font-semibold text-slate-900">{recs.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left px-5 py-4 font-bold">Query</th>
                <th className="text-left px-5 py-4 font-bold">
                  Recommended Product
                </th>
                <th className="text-left px-5 py-4 font-bold">Date</th>
                <th className="text-right px-5 py-4 font-bold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recs.map((r) => (
                <tr key={r._id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900 line-clamp-1">
                      {r.queryTitle}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      Original Product: {r.productName}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={r.recProductImage}
                        alt={r.recProductName}
                        className="h-10 w-10 rounded-lg object-cover border"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 line-clamp-1">
                          {r.recProductName}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {r.recTitle}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/queries/${r.queryId}`}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition font-semibold"
                        title="View Query"
                      >
                        <FiExternalLink />
                        View
                      </Link>

                      <button
                        onClick={() => handleDelete(r._id)}
                        disabled={deletingId === r._id}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500 text-white hover:opacity-90 transition font-semibold disabled:opacity-60"
                        title="Delete"
                      >
                        <FiTrash2 />
                        {deletingId === r._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyRecommendations;
