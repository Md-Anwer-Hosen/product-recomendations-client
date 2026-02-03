import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiTag, FiThumbsUp } from "react-icons/fi";

export default function MyQueryCard({ query, onDelete }) {
  const {
    _id,
    productName,
    productBrand,
    productImage,
    queryTitle,
    boycottingReason,
    recommendationCount,
    createdAt,
  } = query;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <div className="h-44 w-full overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover hover:scale-[1.03] transition"
        />
      </div>

      {/* Body */}
      <div className="p-5">
        {/* top row */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-[#863efa] font-semibold">
            <FiTag />
            <span className="line-clamp-1">{productBrand}</span>
          </div>
          <span className="text-slate-500 text-xs">
            {createdAt ? new Date(createdAt).toLocaleDateString() : ""}
          </span>
        </div>

        <h3 className="mt-3 font-extrabold text-slate-900 text-lg line-clamp-1">
          {productName}
        </h3>

        <p className="text-sm font-semibold text-slate-700 mt-1 line-clamp-2">
          {queryTitle}
        </p>

        <p className="text-sm text-slate-600 mt-2 line-clamp-2">
          {boycottingReason}
        </p>

        {/* footer row */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[#863efa] font-semibold">
            <FiThumbsUp />
            {recommendationCount ?? 0} Recs
          </div>

          <div className="flex items-center gap-2">
            {/* Edit */}
            <Link
              to={`/updateQuery/${_id}`}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition text-sm font-semibold"
            >
              <FiEdit2 />
              Edit
            </Link>

            {/* Delete */}
            <button
              onClick={() => onDelete?.(_id)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500 text-white hover:opacity-90 transition text-sm font-semibold"
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
