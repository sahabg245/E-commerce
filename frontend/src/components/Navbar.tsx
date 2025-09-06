import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

const Navbar = () => {
  const cartCount = useCartStore(state => state.totalItems);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  return (
    <header className="bg-yellow-400">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-2xl font-extrabold">MyAmazon</Link>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-2xl p-2 rounded"
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/products'); }}
          />
        </div>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span>Hi, {user.name}</span>

              {user?.role && (
                <div className="relative group">
                  <button className="text-red-600 font-bold">Admin ▾</button>
                    <div className="absolute hidden group-hover:flex flex-col bg-white shadow rounded mt-2 z-50">                    
                      <Link to="/admin/products" className="block px-4 py-2 hover:bg-gray-100">Manage Products</Link>
                      <Link to="/admin/orders" className="block px-4 py-2 hover:bg-gray-100">Manage Orders</Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
          <Link to="/cart" className="relative">
            Cart <span className="ml-2 bg-black text-white rounded-full px-2 text-sm">{cartCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
