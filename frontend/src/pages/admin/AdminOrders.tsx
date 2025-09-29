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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<"place" | "ship" | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("/api/orders", {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };

  const handleAction = (order: Order, type: "place" | "ship") => {
    setSelectedOrder(order);
    setActionType(type);
    setConfirmOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedOrder || !actionType) return;

    try {
      const endpoint =
        actionType === "place"
          ? `/api/orders/${selectedOrder._id}/place`
          : `/api/orders/${selectedOrder._id}/ship`;

      const res = await axios.put(
        endpoint,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      toast.success(
        actionType === "place"
          ? "Order placed successfully!"
          : "Order shipped successfully!"
      );

      // remove updated order from UI
      setOrders((prev) => prev.filter((o) => o._id !== res.data._id));
    } catch (error) {
      toast.error("Failed to update order");
      console.error(error);
    }

    setConfirmOpen(false);
    setActionType(null);
    setSelectedOrder(null);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">Admin: Manage Orders</h1>
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
                  <span className="text-sm text-gray-600">{o.user?.email}</span>
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
                <td className="p-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleAction(o, "place")}
                  >
                    Place Order
                  </button>
                  <button
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => handleAction(o, "ship")}
                  >
                    Mark Shipped
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Modal */}
      {confirmOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to{" "}
              <span className="font-bold">
                {actionType === "place" ? "place" : "ship"}
              </span>{" "}
              this order for <b>{selectedOrder.user?.name}</b>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                onClick={confirmAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
