import { Link } from "react-router-dom";
import { FiThumbsUp, FiTag, FiArrowRight } from "react-icons/fi";

export default function QueriesSection({ queries = [] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {queries.map((query) => (
          <div
            key={query._id}
            className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Image */}
            <div className="h-44 w-full overflow-hidden">
              <img
                src={query.productImage}
                alt={query.productName}
                className="w-full h-full object-cover hover:scale-[1.03] transition"
              />
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-[#863efa] font-semibold">
                  <FiTag />
                  {query.productBrand}
                </div>
                <span className="text-slate-500 text-xs">
                  {new Date(query.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="mt-3 font-extrabold text-slate-900 text-lg line-clamp-1">
                {query.productName}
              </h3>

              <p className="text-sm font-semibold text-slate-700 mt-1 line-clamp-2">
                {query.queryTitle}
              </p>

              <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                {query.boycottingReason}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-[#863efa] font-semibold">
                  <FiThumbsUp />
                  {query.recommendationCount} Recs
                </div>

                <Link
                  to={`/queries/${query._id}`}
                  className="flex items-center gap-2 text-sm font-semibold text-[#863efa] hover:opacity-80"
                >
                  View <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
