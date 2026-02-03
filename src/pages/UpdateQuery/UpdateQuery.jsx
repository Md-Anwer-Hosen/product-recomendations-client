import { FiImage, FiTag, FiType, FiSend } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useQueriDetails from "../../hooks/useQueriDetails";

export default function UpdateQuery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: query, isLoading, isError } = useQueriDetails(id);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

  if (isError)
    return (
      <div className="max-w-md mx-auto mt-20 alert alert-error">
        <span>Failed to load query</span>
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      const res = await axiosSecure.patch(`/queries/${id}`, updatedData);

      if (res?.data?.modifiedCount > 0) {
        alert("Query updated successfully!");
        navigate("/myQueries");
      } else {
        alert("No changes made.");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to update query!");
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="text-center">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#863efa]/10 text-[#863efa] text-xs font-semibold">
          Update Query
        </p>
        <h1 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
          Edit your product query
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Update your query details and save changes.
        </p>
      </div>

      {/* Card */}
      <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grid inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Product Name */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Product Name
                </label>
                <div className="mt-2 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <FiType />
                  </span>
                  <input
                    name="productName"
                    defaultValue={query?.productName || ""}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#863efa]/40"
                    required
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Product Brand
                </label>
                <div className="mt-2 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <FiTag />
                  </span>
                  <input
                    name="productBrand"
                    defaultValue={query?.productBrand || ""}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#863efa]/40"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Product Image URL */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Product Image URL
              </label>
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FiImage />
                </span>
                <input
                  name="productImage"
                  defaultValue={query?.productImage || ""}
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#863efa]/40"
                  required
                />
              </div>
            </div>

            {/* Query Title */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Query Title
              </label>
              <textarea
                name="queryTitle"
                defaultValue={query?.queryTitle || ""}
                rows={3}
                className="mt-2 w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#863efa]/40 resize-none"
                required
              />
            </div>

            {/* Boycotting Reason */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Boycotting Reason Details
              </label>
              <textarea
                name="boycottingReason"
                defaultValue={query?.boycottingReason || ""}
                rows={5}
                className="mt-2 w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#863efa]/40 resize-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#863efa] text-white font-semibold hover:opacity-90 transition"
              >
                Update
                <FiSend />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
