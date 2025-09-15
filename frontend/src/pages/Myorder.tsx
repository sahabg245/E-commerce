import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    axios.get("/api/orders/my", {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [user]);

  const cancelOrder = async (id: string) => {
    try {
      await axios.put(`/api/orders/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: "Cancelled" } : o));
      toast.success("Order cancelled");
    } catch {
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">My Orders</h1>
      {orders.map(o => (
        <div key={o._id} className="border p-3 mb-3 rounded">
          <div>Status: {o.status}</div>
          <div>Total: ${o.totalPrice.toFixed(2)}</div>
          <ul className="ml-4 list-disc">
            {o.items.map((i: any, idx: number) => (
              <li key={idx}>{i.name} x {i.qty}</li>
            ))}
          </ul>
          {o.status === "Pending" && (
            <button
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => cancelOrder(o._id)}
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
