import blogs from "../../assets/blogData.json";
import { FiCalendar } from "react-icons/fi";

const badgeStyles = {
  Research: "bg-emerald-100 text-emerald-700",
  Lifestyle: "bg-rose-100 text-rose-700",
  Travel: "bg-amber-100 text-amber-700",
  Tech: "bg-indigo-100 text-indigo-700",
  Productivity: "bg-sky-100 text-sky-700",
  Design: "bg-violet-100 text-violet-700",
};

export default function Blog() {
  return (
    <section className="bg-slate-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-slate-900">
          Latest Blogs
        </h2>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 6).map((b) => (
            <article
              key={b.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* Image */}
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="h-full w-full object-cover hover:scale-[1.02] transition duration-300"
                  loading="lazy"
                />
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Meta row */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      badgeStyles[b.category] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {b.category}
                  </span>

                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <FiCalendar />
                    <span>{b.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-extrabold text-slate-900 leading-snug">
                  {b.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {b.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">
                    By {b.author}
                  </p>

                  <button className="text-sm font-semibold text-[#863efa] hover:opacity-80 transition">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
