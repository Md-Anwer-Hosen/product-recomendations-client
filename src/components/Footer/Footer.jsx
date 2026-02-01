import { Link } from "react-router-dom";
import { FiFacebook, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16">
      <div className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-10 md:grid-cols-3 items-start">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#863efa] text-white grid place-items-center shadow-sm">
                  <span className="font-extrabold tracking-wide">PR</span>
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-slate-900">ProductReco</p>
                  <p className="text-xs text-slate-500 -mt-0.5">
                    Ask. Compare. Recommend.
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 max-w-sm">
                A clean product recommendation platform where users post queries
                and others suggest better alternatives with reasons.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3 md:justify-self-center">
              <p className="text-sm font-semibold text-slate-900">
                Quick Links
              </p>
              <div className="grid gap-2">
                <Link
                  to="/"
                  className="text-sm text-slate-600 hover:text-[#863efa] transition"
                >
                  Home
                </Link>
                <Link
                  to="/queries"
                  className="text-sm text-slate-600 hover:text-[#863efa] transition"
                >
                  Queries
                </Link>
                <Link
                  to="/login"
                  className="text-sm text-slate-600 hover:text-[#863efa] transition"
                >
                  Log-in
                </Link>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-3 md:justify-self-end">
              <p className="text-sm font-semibold text-slate-900">Social</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-2xl border border-slate-200 bg-white hover:bg-[#863efa]/10 transition grid place-items-center"
                  aria-label="Facebook"
                >
                  <FiFacebook className="text-lg text-slate-700" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-2xl border border-slate-200 bg-white hover:bg-[#863efa]/10 transition grid place-items-center"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="text-lg text-slate-700" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              © {year}{" "}
              <span className="font-semibold text-slate-900">ProductReco</span>.
              All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-sm text-slate-600">
              <Link to="/" className="hover:text-[#863efa] transition">
                Privacy
              </Link>
              <Link to="/" className="hover:text-[#863efa] transition">
                Terms
              </Link>
              <Link to="/" className="hover:text-[#863efa] transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
