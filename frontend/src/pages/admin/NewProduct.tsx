import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NewProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState<number>(0);
  const user = useAuthStore((s) => s.user);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/products',
        { name, price, description, countInStock },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      toast.success('Product created');
      nav('/admin/products');
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Failed to create product';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Add New Product</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            min="0"
            value={price || ''}
            onChange={(e) => setPrice(Number(e.target.value)||0)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(Number(e.target.value))}
          />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default NewProduct;
