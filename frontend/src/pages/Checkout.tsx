import React from 'react';
import { useCartStore } from '../stores/cartStore';

const Checkout = () => {
  const items = useCartStore(s => s.items);
  const subtotal = useCartStore(s => s.subtotal());

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {items.map(i => (
              <li key={i._id} className="border-b py-2 flex justify-between">
                <span>{i.name} (x{i.qty})</span>
                <span>${(i.qty * i.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold">Subtotal: ${subtotal.toFixed(2)}</div>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
