import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../stores/authStore";
import toast from "react-hot-toast";

type Order = {
  _id: string;
  user: { name: string; email: string };
  items: { name: string; qty: number; price: number }[];
  totalPrice: number;
  status: string;
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    axios
      .get("/api/orders", {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await axios.put(
        `/api/orders/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setOrders(
        orders.map((o) => (o._id === id ? { ...o, status: res.data.status } : o))
      );
      toast.success("Order updated");
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Admin: Manage Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Customer</th>
              <th className="p-2">Items</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border">
                <td className="p-2">
                  {o.user?.name} <br />
                  <span className="text-sm">{o.user?.email}</span>
                </td>
                <td className="p-2">
                  {o.items.map((i, idx) => (
                    <div key={idx}>
                      {i.name} x {i.qty} (${i.price})
                    </div>
                  ))}
                </td>
                <td className="p-2 font-bold">${o.totalPrice.toFixed(2)}</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded mr-2"
                    onClick={() => updateStatus(o._id, "Shipped")}
                  >
                    Mark Shipped
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => updateStatus(o._id, "Delivered")}
                  >
                    Mark Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
