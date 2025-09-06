import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

type Product = { _id: string; name: string; price: number; description?: string };

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const add = useCartStore(s => s.add);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => { console.error(err); setProducts([]); });
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded shadow-sm">
            <Link to={`/products/${p._id}`} className="font-bold text-lg">{p.name}</Link>
            <p className="text-sm">{p.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-xl font-semibold">${p.price.toFixed(2)}</div>
              <button className="bg-yellow-400 px-3 py-1 rounded" onClick={() => { add({_id: p._id, name: p.name, price: p.price, qty: 1}); toast.success('Added to cart'); }}>
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
