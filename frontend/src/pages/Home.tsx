import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="mb-6">
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-100 p-8 rounded">
          <h1 className="text-4xl font-bold">Welcome to E-Amazon</h1>
          <Link to="/products" className="inline-block mt-4 bg-black text-white px-4 py-2 rounded">Shop Now</Link>
        </div>
      </section>
      <section>
        <h2 className="text-2xl mb-3">Featured products</h2>
        <div>
          <Link to="/products" className="text-blue-600 underline">Browse products</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
