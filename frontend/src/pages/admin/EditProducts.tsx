import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState<number>(0);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const user = useAuthStore((s) => s.user);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        const p = res.data;
        setName(p.name);
        setPrice(p.price);
        setDescription(p.description);
        setCountInStock(p.countInStock);
        setImage(p.image);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load product');
      });
  }, [id]);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setImage(data.image); // ✅ update image
      toast.success('Image uploaded');
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/products/${id}`,
        { name, price, description, countInStock, image },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      toast.success('Product updated');
      nav('/admin/products');
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Failed to update product';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Edit Product</h1>
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
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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

        {/* ✅ Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input type="file" onChange={uploadFileHandler} />
          {uploading && <p>Uploading...</p>}
          {image && <img src={image} alt="preview" className="w-32 mt-2 rounded" />}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
