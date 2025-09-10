import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

type Product = { 
  _id: string; 
  name: string; 
  price: number; 
  description?: string; 
  countInStock?: number;
  image?: string;
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const add = useCartStore(s => s.add);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow flex items-center justify-center">
        {/* ✅ Show product image */}
        {product.image ? (
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="h-40 w-full object-cover rounded mb-2"
          />

        ) : (
          <span className="text-gray-500">No image available</span>
        )}
      </div>
      
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2">{product.description}</p>
        <div className="mt-4 text-2xl">${product.price.toFixed(2)}</div>
        
        <div className="mt-4">
          <button 
            className="bg-yellow-400 px-4 py-2 rounded"
            onClick={() => { 
              add({_id: product._id, name: product.name, price: product.price, qty: 1}); 
              toast.success('Added to cart'); 
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
