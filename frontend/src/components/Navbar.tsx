import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const Navbar = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <nav className="bg-yellow-400 shadow-md px-6 py-3 flex justify-between items-center">
      <Link
        to="/"
        className="font-bold text-2xl text-gray-800 hover:text-black transition-colors duration-200"
      >
        🛒 E-Commerce
      </Link>

      <div className="flex gap-6 items-center">
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
    </nav>
  );
};

export default Navbar;
