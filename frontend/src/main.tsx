import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./styles/index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import NewProduct from "./pages/admin/NewProduct";
import EditProduct from "./pages/admin/EditProducts";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/Myorder";
import { useAuthStore } from "./stores/authStore";
import ProtectedRoute from "../src/components/ProtectedRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./pages/admin/AdminRoute";

const AppLayout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<h2>Welcome to Admin Dashboard</h2>} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products/new" element={<NewProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
          </Route>
        </Routes>
      </main>
      {!hideNavbar && <Footer />}
      <Toaster />
    </div>
  );
};

const App = () => {
  const checkToken = useAuthStore((s) => s.checkToken);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
