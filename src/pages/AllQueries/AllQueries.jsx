import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import QueriesSection from "../../components/QueriesSection/QueriesSection";
import useAllQueries from "../../hooks/useAllQueries";

const AllQueries = () => {
  const [search, setSearch] = useState("");
  const { data: queries = [], isLoading, isError } = useAllQueries(search);

  return (
    <section className="text-black">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#863efa]/10 text-[#863efa] text-xs font-semibold">
              Queries
            </p>
            <h1 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
              Browse product queries
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Search by product name.
            </p>
          </div>

          <div className="w-full sm:w-[420px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product name..."
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#863efa]/40"
              />
              {!!search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                  title="Clear"
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className="mt-2 text-xs text-slate-500">
              Total: <span className="font-semibold">{queries.length}</span>
            </div>
          </div>
        </div>

        {/* States */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-ring loading-xl"></span>
          </div>
        )}

        {isError && (
          <div className="max-w-md mx-auto mt-10 alert alert-error">
            <span>Failed to load queries</span>
          </div>
        )}

        {!isLoading && !isError && queries.length === 0 && (
          <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-extrabold text-slate-900">
              No results found
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Try searching with a different product name.
            </p>
          </div>
        )}
      </div>

      {/* Results */}
      {!isLoading && !isError && queries.length > 0 && (
        <QueriesSection queries={queries} />
      )}
    </section>
  );
};

export default AllQueries;
