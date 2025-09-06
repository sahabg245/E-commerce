import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const setUser = useAuthStore(s => s.setUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      setUser(res.data.user);
      toast.success('Registered');
      nav('/');
    } catch (err) {
      console.error(err);
      toast.error('Register failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Create account</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <div className="flex items-center justify-between">
          <button className="bg-yellow-400 px-4 py-2 rounded">Create account</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
