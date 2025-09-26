import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../stores/authStore";
import toast from "react-hot-toast";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, PlusCircle } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setStats(data);
      } catch {
        toast.error("Failed to fetch dashboard stats");
      }
    };

    if (location.pathname === "/admin" || location.pathname === "/admin/dashboard") {
      fetchStats();
    }
  }, [user, location.pathname]);

  const isNestedRoute =
    location.pathname.startsWith("/admin/products") ||
    location.pathname.startsWith("/admin/orders");

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Manage Products", path: "/admin/products", icon: <Package size={18} /> },
    { name: "Manage Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
    { name: "Add New Product", path: "/admin/products/new", icon: <PlusCircle size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col p-6 shadow-xl">
        <h2 className="text-2xl font-extrabold mb-8 text-yellow-400">Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname.startsWith(item.path)
                  ? "bg-yellow-500 text-white shadow-md"
                  : "hover:bg-gray-800 hover:text-yellow-400"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {!isNestedRoute ? (
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
              Welcome Back, Admin 👋
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition">
                <h2 className="text-lg font-semibold text-gray-600">Products</h2>
                <p className="text-4xl font-extrabold text-yellow-500 mt-2">
                  {stats.products}
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition">
                <h2 className="text-lg font-semibold text-gray-600">Orders</h2>
                <p className="text-4xl font-extrabold text-yellow-500 mt-2">
                  {stats.orders}
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition">
                <h2 className="text-lg font-semibold text-gray-600">Users</h2>
                <p className="text-4xl font-extrabold text-yellow-500 mt-2">
                  {stats.users}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;