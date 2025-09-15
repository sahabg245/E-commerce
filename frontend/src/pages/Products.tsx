import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

type Product = { 
  _id: string; 
  name: string; 
  price: number; 
  description?: string;
  image?: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const add = useCartStore(s => s.add);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => { 
        console.error(err); 
        setProducts([]); 
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-6 font-bold">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div 
            key={p._id} 
            className="border p-4 rounded shadow-sm flex flex-col justify-between h-80 bg-white"
          >
            {p.image && (
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name}
                className="h-40 w-full object-contain rounded mb-2"
              />
            )}

            <Link 
              to={`/products/${p._id}`} 
              className="font-bold text-lg block truncate"
            >
              {p.name}
            </Link>

            <p className="text-sm text-gray-600 line-clamp-2">
              {p.description}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <div className="text-xl font-semibold">${p.price.toFixed(2)}</div>
              <button 
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                onClick={() => { 
                  add({_id: p._id, name: p.name, price: p.price, qty: 1}); 
                  toast.success('Added to cart'); 
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
