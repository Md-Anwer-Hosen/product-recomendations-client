import { FiImage, FiTag, FiType, FiSend } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AddQueryForm() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const finalData = {
      ...data,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
    };

    console.log(finalData);

    try {
      const res = await axiosSecure.post("/queries", finalData);
      form.reset();

      if (res?.data?.insertedId) {
        form.reset();
        alert("Query added successfully!");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to add query!");
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="text-center">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#863efa]/10 text-[#863efa] text-xs font-semibold">
          Add Query
        </p>
        <h1 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
          Create a new product query
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Ask for better alternatives and help others make smarter choices.
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
                    placeholder="e.g. Logitech MX Master 3S"
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
                    placeholder="e.g. Logitech"
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
                  placeholder="https://..."
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#863efa]/40"
                  required
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Tip: Use a stable image URL (iBB / Cloudinary / your hosted
                image).
              </p>
            </div>

            {/* Query Title */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Query Title
              </label>
              <textarea
                name="queryTitle"
                placeholder="e.g. Is there any better product that gives the same quality?"
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
                placeholder="Explain why you don’t want this product (quality, price, ethics, durability, etc.)"
                rows={5}
                className="mt-2 w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#863efa]/40 resize-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#863efa] text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                Add
                <FiSend />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
