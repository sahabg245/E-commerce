// import { Link } from "react-router-dom";
// import { useAuthStore } from "../stores/authStore";

// const Navbar = () => {
//   const user = useAuthStore((s) => s.user);
//   const logout = useAuthStore((s) => s.logout);

//   return (
//     <nav className="bg-yellow-400 shadow-md px-6 py-3 flex justify-between items-center">
//       <Link
//         to="/"
//         className="font-bold text-2xl text-gray-800 hover:text-black transition-colors duration-200"
//       >
//         🛒 E-Commerce
//       </Link>

//       <div className="flex gap-6 items-center">
//         {user && user.role !== "admin" && (
//           <>
//             <Link
//               to="/products"
//               className="text-lg font-medium text-gray-700 hover:text-black hover:underline transition-colors"
//             >
//               Products
//             </Link>
//             <Link
//               to="/cart"
//               className="text-lg font-medium text-gray-700 hover:text-black hover:underline transition-colors"
//             >
//               Cart
//             </Link>
//             <Link
//               to="/my-orders"
//               className="text-lg font-medium text-gray-700 hover:text-black hover:underline transition-colors"
//             >
//               My Orders
//             </Link>
//           </>
//         )}

//         {user && user.role === "admin" && (
//           <Link
//             to="/admin/dashboard"
//             className="text-lg font-semibold text-red-600 hover:text-red-800 hover:underline transition-colors"
//           >
//             Admin Dashboard
//           </Link>
//         )}

//         {!user ? (
//           <>
//             <Link
//               to="/login"
//               className="px-4 py-2 rounded-lg bg-white text-yellow-600 font-medium hover:bg-yellow-500 hover:text-white transition"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="px-4 py-2 rounded-lg bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition"
//             >
//               Register
//             </Link>
//           </>
//         ) : (
//           <button
//             onClick={logout}
//             className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useState } from "react";

const Navbar = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-yellow-400 shadow-md px-6 py-3 flex justify-between items-center relative">
      {/* Logo */}
      <Link
        to="/"
        className="font-bold text-2xl text-gray-800 hover:text-black transition-colors duration-200"
      >
        🛒 E-Commerce
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        {user && user.role !== "admin" && (
          <>
            <Link
              to="/products"
              className="text-lg font-medium text-gray-700 hover:text-black hover:underline transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-lg font-medium text-gray-700 hover:text-black hover:underline transition-colors"
            >
              Cart
            </Link>
            <Link
              to="/my-orders"
              className="text-lg font-medium text-gray-700 hover:text-black hover:underline transition-colors"
            >
              My Orders
            </Link>
          </>
        )}

        {user && user.role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="text-lg font-semibold text-red-600 hover:text-red-800 hover:underline transition-colors"
          >
            Admin Dashboard
          </Link>
        )}

        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-white text-yellow-600 font-medium hover:bg-yellow-500 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Hamburger Icon (Mobile) */}
      <button
        className="md:hidden flex flex-col space-y-1 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-yellow-300 shadow-lg flex flex-col items-start p-4 space-y-3 md:hidden z-50">
          {user && user.role !== "admin" && (
            <>
              <Link
                to="/products"
                className="block text-lg font-medium text-gray-700 hover:text-black"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="block text-lg font-medium text-gray-700 hover:text-black"
                onClick={() => setMenuOpen(false)}
              >
                Cart
              </Link>
              <Link
                to="/my-orders"
                className="block text-lg font-medium text-gray-700 hover:text-black"
                onClick={() => setMenuOpen(false)}
              >
                My Orders
              </Link>
            </>
          )}

          {user && user.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="block text-lg font-semibold text-red-600 hover:text-red-800"
              onClick={() => setMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="block w-full text-left px-4 py-2 rounded-lg bg-white text-yellow-600 font-medium hover:bg-yellow-500 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-left px-4 py-2 rounded-lg bg-yellow-600 text-white font-medium hover:bg-yellow-700"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
