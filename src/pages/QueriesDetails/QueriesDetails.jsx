import { FiSearch } from "react-icons/fi";
import useQueriDetails from "../../hooks/useQueriDetails";
import { useParams } from "react-router-dom";

export default function QueriesDetails() {
  const { id } = useParams();

  const { data: query, isLoading, isError } = useQueriDetails(id);

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
          <p className="text-slate-500">
            {new Date(query.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-4 text-sm font-semibold text-[#863efa]">
          Recommendations: {query.recommendationCount}
        </div>
      </div>
    </section>
  );
}
