import React from 'react';
import { useCartStore } from '../stores/cartStore';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const items = useCartStore(s => s.items);
  const subtotal = useCartStore(s => s.subtotal()); // ✅ call function
  const remove = useCartStore(s => s.remove);
  const clear = useCartStore(s => s.clear);
  const nav = useNavigate();

  return (
    <div>
      <h1 className="text-3xl mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {items.map(i => (
              <div
                key={i._id}
                className="flex items-center justify-between border p-3 mb-2"
              >
                <div>
                  <div className="font-bold">{i.name}</div>
                  <div>Qty: {i.qty}</div>
                </div>
                <div>
                  <div>${(i.price * i.qty).toFixed(2)}</div>
                  <button
                    className="text-red-600 mt-2"
                    onClick={() => remove(i._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => clear()}
            >
              Clear Cart
            </button>
          </div>
          <div className="p-4 border rounded">
            <h2 className="font-bold">Order Summary</h2>
            <div className="mt-2">Subtotal: ${subtotal.toFixed(2)}</div>
            <button
              onClick={() => nav('/checkout')} // ✅ Go to checkout page
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
