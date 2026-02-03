import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiUser, FiGrid } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false); // left drawer (mobile)
  const [profileOpen, setProfileOpen] = useState(false); // right drawer (all sizes)
  const location = useLocation();

  // close drawers on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold rounded-lg transition ${
      isActive ? "text-[#863efa]" : "text-slate-700 hover:text-[#863efa]"
    }`;

  const routesPublic = [
    { to: "/", label: "Home" },
    { to: "/queries", label: "allQueries" },
  ];

  const routesPrivate = [
    { to: "/addQueries", label: "Add Query" },
    { to: "/recommendationForMe", label: "Recommendations For Me" },
    { to: "/myQueries", label: "My Queries" },
    { to: "/myRecommendations", label: "My Recommendations" },
  ];

  const routes = user ? [...routesPublic, ...routesPrivate] : routesPublic;

  return (
    <>
      <nav className="sticky top-0 z-50  backdrop-blur border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* ===== MOBILE: Left Menu Icon ===== */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="h-10 w-10 rounded-xl hover:bg-slate-100 grid place-items-center transition"
              aria-label="Open menu"
            >
              <FiMenu className="text-2xl text-slate-800" />
            </button>
          </div>

          {/* ===== DESKTOP: Left Logo ===== */}
          <Link to="/" className="hidden md:flex items-center gap-2">
            <div className="w-9 h-9 bg-[#863efa] rounded-xl text-white font-extrabold flex items-center justify-center">
              PR
            </div>
            <span className="text-lg font-semibold text-slate-900">
              ProductReco
            </span>
          </Link>

          {/* ===== MOBILE: Center Title (All Queries) ===== */}
          <div className="md:hidden">
            <Link
              to="/queries"
              className="text-sm font-semibold text-slate-900 hover:text-[#863efa] transition"
            >
              All Queries
            </Link>
          </div>

          {/* ===== DESKTOP: Middle Routes ===== */}
          <div className="hidden md:flex items-center gap-1">
            {routes.map((r) => (
              <NavLink
                key={r.to}
                to={r.to}
                className={navLinkClass}
                end={r.to === "/"}
              >
                {r.label}
              </NavLink>
            ))}
          </div>

          {/* ===== Right: Login / Avatar ===== */}
          <div className="flex items-center gap-3">
            {!user ? (
              <Link
                to="/signIn"
                className="px-4 py-2 bg-[#863efa] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => setProfileOpen(true)}
                className="w-10 h-10 rounded-full ring-2 ring-[#863efa]/30 overflow-hidden"
                aria-label="Open profile"
              >
                <img
                  src={user?.photoURL || "https://i.ibb.co/2PpGq1m/avatar.png"}
                  alt="user"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ========================= */}
      {/* LEFT DRAWER (Mobile Menu) */}
      {/* ========================= */}
      {/* overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      {/* drawer */}
      <aside
        className={`fixed top-0 left-0 z-[60] h-60% w-[82%] rounded-xl max-w-xs bg-white shadow-xl md:hidden transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#863efa] rounded-xl text-white font-extrabold flex items-center justify-center">
              PR
            </div>
            <div>
              <p className="font-semibold text-slate-900">ProductReco</p>
              <p className="text-xs text-slate-500">Menu</p>
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="h-10 w-10 rounded-xl hover:bg-slate-100 grid place-items-center transition"
            aria-label="Close menu"
          >
            <FiX className="text-2xl text-slate-800" />
          </button>
        </div>

        <div className="p-3 space-y-1">
          {routes.map((r) => (
            <NavLink
              key={r.to}
              to={r.to}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#863efa]/10 text-[#863efa]"
                    : "text-slate-800 hover:bg-slate-100"
                }`
              }
              end={r.to === "/"}
            >
              {r.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto p-3">
          {!user ? (
            <Link
              to="/signIn"
              className="block text-center px-4 py-3 rounded-xl bg-[#863efa] text-white font-semibold"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                setProfileOpen(true);
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-semibold text-slate-800 hover:bg-slate-100 transition"
            >
              Open Profile
            </button>
          )}
        </div>
      </aside>

      {/* ========================= */}
      {/* RIGHT DRAWER (User Panel) */}
      {/* ========================= */}
      {/* overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          profileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setProfileOpen(false)}
      />
      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 z-[60] h-50% w-[70%] max-w-sm rounded-xl bg-white shadow-xl transform transition-transform ${
          profileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <p className="text-lg font-semibold text-slate-900">Account</p>
          <button
            onClick={() => setProfileOpen(false)}
            className="h-8 w-8 rounded-xl hover:bg-slate-100 grid place-items-center transition"
            aria-label="Close profile"
          >
            <FiX className="text-xl text-slate-800" />
          </button>
        </div>

        <div className="p-4">
          {/* User card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#863efa]/10 border border-[#863efa]/15">
            <img
              src={user?.photoURL || "U"}
              alt="user"
              className="w-8 h-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-slate-600 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 space-y-2">
            <Link
              to="/my-queries"
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition font-semibold text-slate-800"
            >
              <FiGrid className="text-md" />
              Dashboard
            </Link>

            <Link
              to="/my-recommendations"
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition font-semibold text-slate-800"
            >
              <FiUser className="text-mg" />
              My Recommendations
            </Link>

            <button
              onClick={signOutUser}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-[#863efa] text-white font-semibold hover:opacity-90 transition"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          </div>

          {/* small note */}
          <p className="mt-6 text-xs text-slate-500">
            Tip: Press <span className="font-semibold">ESC</span> to close
            panels.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
