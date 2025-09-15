import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const carouselImages = [
  { src: "/images/shirt.jpg", alt: "Men's Shirt", link: "/products" },
  { src: "/images/pant.jpeg", alt: "Stylish Pants", link: "/products" },
  { src: "/images/belt.jpeg", alt: "Belts", link: "/products" },
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <div className="space-y-12">
      <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-lg shadow">
        <AnimatePresence>
          <motion.img
            key={index}
            src={carouselImages[index].src}
            alt={carouselImages[index].alt}
            className="w-full h-72 md:h-96 object-contain rounded-lg bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow hover:bg-gray-800"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow hover:bg-gray-800"
        >
          ›
        </button>

        <div className="absolute bottom-3 w-full flex justify-center space-x-2">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full ${
                i === index ? "bg-yellow-400" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Electronics", "Clothing", "Books", "Home"].map((cat) => (
            <Link
              key={cat}
              to="/products"
              className="bg-white border rounded-lg shadow hover:shadow-lg p-6 text-center font-semibold hover:bg-gray-50 transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((p) => (
            <div
              key={p}
              className="border rounded-lg shadow hover:shadow-lg bg-white p-4 flex flex-col"
            >
              <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <h3 className="font-semibold text-lg">Sample Product {p}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Best quality at great price.
              </p>
              <div className="mt-auto flex justify-between items-center pt-3">
                <span className="text-xl font-bold text-green-600">
                  $19.{p}9
                </span>
                <Link
                  to="/products"
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
