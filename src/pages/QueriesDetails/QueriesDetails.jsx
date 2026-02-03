import { FiEdit2, FiSearch } from "react-icons/fi";
import useQueriDetails from "../../hooks/useQueriDetails";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRecommendations from "../../hooks/useRecommendations";

export default function QueriesDetails() {
  const { id } = useParams();

  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: query, isLoading, isError } = useQueriDetails(id);
  const { data: recs = [], isLoading: recLoading } = useRecommendations(id);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
        Failed to load query details
      </div>
    );
  }

  if (!query) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-[#863efa]/10 grid place-items-center">
          <FiSearch className="text-2xl text-[#863efa]" />
        </div>
        <h3 className="mt-4 text-lg font-extrabold text-slate-900">
          Query not found
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          The query may have been deleted or the link is incorrect.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
        {query.queryTitle}
      </h2>

      <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <img
            src={query.productImage}
            alt={query.productName}
            className="w-20 h-20 rounded-xl object-cover border"
          />
          <div>
            <p className="text-sm text-slate-500">Product</p>
            <p className="text-lg font-extrabold text-slate-900">
              {query.productName}
            </p>
            <p className="text-sm font-semibold text-[#863efa]">
              {query.productBrand}
            </p>
          </div>
        </div>

        <p className="mt-6 text-slate-700">
          <span className="font-semibold">Boycott reason: </span>
          {query.boycottingReason}
        </p>

        <div className="mt-6 flex items-center justify-between text-sm">
          <p className="text-slate-600">
            Posted by: <span className="font-semibold">{query.userName}</span>
          </p>
        </div>

        <div className="mt-4 text-sm font-semibold text-[#863efa] flex justify-between">
          <p> Recommendations: {query.recommendationCount}</p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center bg-green-400 hover:bg-green-500 gap-2 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 transition text-sm font-semibold"
          >
            <FiEdit2 />
          </button>
        </div>
      </div>

      <div>
        {showForm && (
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 text-black">
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">
              Add Recommendation
            </h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const data = Object.fromEntries(new FormData(form).entries());

                const finalData = {
                  ...data,
                  queryId: query._id,
                  queryTitle: query.queryTitle,
                  productName: query.productName,
                  userEmail: query.userEmail,
                  userName: query.userName,
                  recommenderEmail: user.email,
                  recommenderName: user.displayName,
                };

                await axiosSecure.post("/recommendations", finalData);
                form.reset();
                setShowForm(false);
                alert("Recommendation Added!");
              }}
              className="space-y-4"
            >
              <input
                name="recTitle"
                placeholder="Recommendation Title"
                className="w-full border p-3 rounded"
                required
              />

              <input
                name="recProductName"
                placeholder="Recommended Product Name"
                className="w-full border p-3 rounded"
                required
              />

              <input
                name="recProductImage"
                placeholder="Recommended Product Image URL"
                className="w-full border p-3 rounded"
                required
              />

              <textarea
                name="recReason"
                placeholder="Why this is better?"
                className="w-full border p-3 rounded"
                rows={4}
                required
              />

              <button className="px-4 py-2 bg-[#863efa] text-white rounded-xl">
                Submit Recommendation
              </button>
            </form>
          </div>
        )}
      </div>
      <div>
        <div className="mt-10">
          <h3 className="text-lg font-extrabold text-slate-900">
            All Recommendations
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {recs.length} recommendation(s) for this query
          </p>

          {recLoading ? (
            <div className="py-8 flex justify-center">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : recs.length === 0 ? (
            <div className="mt-5 bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-600">
              No recommendations yet. Be the first to recommend!
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {recs.map((r) => (
                <div
                  key={r._id}
                  className="bg-white border border-slate-200 rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={r.recProductImage}
                      alt={r.recProductName}
                      className="h-12 w-12 rounded-xl object-cover border"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-extrabold text-slate-900 line-clamp-1">
                          {r.recProductName}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {r.createdAt
                            ? new Date(r.createdAt).toLocaleString()
                            : ""}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-[#863efa] mt-1">
                        {r.recTitle}
                      </p>

                      <p className="text-sm text-slate-700 mt-2">
                        {r.recReason}
                      </p>

                      <p className="text-xs text-slate-500 mt-3">
                        Recommended by{" "}
                        <span className="font-semibold text-slate-700">
                          {r.recommenderName || "Anonymous"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
