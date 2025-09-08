import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const setUser = useAuthStore(s => s.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });

      console.log("Login response:", res.data); // 👈 Debugging

      const userData = {
        id: res.data.user._id || res.data.user.id, // handle both
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role || 'user',
        token: res.data.token,
      };

      if (!userData.token) {
        toast.error("No token received from backend!");
        return;
      }

      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData)); 
      toast.success('Logged in');
      nav('/');
    } catch (err) {
      console.error(err);
      toast.error('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        <div className="flex items-center justify-between">
          <button className="bg-yellow-400 px-4 py-2 rounded">Login</button>
          <Link to="/register" className="text-sm">Create account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
