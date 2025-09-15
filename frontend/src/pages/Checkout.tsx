import React from "react";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const clear = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!user?.token) {
      toast.error("You must be logged in to place an order");
      return;
    }

    try {
      const orderItems = items.map((i) => ({
        product: i._id,
        name: i.name,
        qty: i.qty,
        price: i.price,
      }));

      await axios.post(
        "/api/orders",
        { items: orderItems, totalPrice: subtotal },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      toast.success("Order placed successfully");
      clear();
      navigate("/my-orders");
    } catch (err: any) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {items.map((i) => (
              <li
                key={i._id}
                className="border-b py-2 flex justify-between text-gray-700"
              >
                <span>
                  {i.name} (x{i.qty})
                </span>
                <span>${(i.qty * i.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold text-lg">
            Subtotal: ${(subtotal || 0).toFixed(2)}
          </div>

          <button
            onClick={placeOrder}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
