import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../stores/authStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products");
      });
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    if (!user?.token) {
      toast.error("Not authorized, please login again");
      return;
    }

    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || "Delete failed";
      toast.error(msg);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Admin: Manage Products</h1>

      <Link
        to="/admin/products/new"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add New Product
      </Link>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border">
              <td className="p-2">
                <img
                  src={p.image || "/placeholder.png"}
                  alt={p.name}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">${p.price}</td>
              <td className="p-2">
                <Link
                  to={`/admin/products/${p._id}/edit`}
                  className="text-blue-600 mr-3"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan={4}>
                No products yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
