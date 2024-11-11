import React, { useState, useEffect } from "react";
import "./index.css";

function History() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");  // Ambil userId dari localStorage

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`https://joki-chuang.vercel.app/products/${productId}`);
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://joki-chuang.vercel.app/orders");
        if (response.ok) {
          const data = await response.json();
          const userOrders = data.filter((order) => order.userId === userId);

          for (const order of userOrders) {
            // Ambil detail produk untuk setiap pesanan
            const productDetailsPromises = order.products.map(async (product) => {
              const productDetails = await fetchProductDetails(product.productId);
              return { ...product, ...productDetails };
            });

            // Tunggu hingga semua permintaan produk selesai
            order.products = await Promise.all(productDetailsPromises);
          }

          setOrders(userOrders);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="background">
      <header className="header-title">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">
            WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
          </h1>
          <nav className="space-x-4">
            <a href="/Dashboard" className="hover:underline">Home</a>
            <a href="/History" className="hover:underline">History</a>
            <a href="#" className="hover:underline">Etalase</a>
            <a href="#"><i className="fas fa-shopping-cart cart-icon"></i></a>
            <a href="#"><i className="fas fa-user-circle" /></a>
          </nav>
        </div>
      </header>

      <div className="p-8 bg-blue-700 scrollable-container">
        <div className="grid grid-cols-7 gap-4 text-center text-lg font-semibold mb-4">
          <div className="bg-blue-500 p-2">#</div>
          <div className="bg-blue-500 p-2">Transaction ID</div>
          <div className="bg-blue-500 p-2">Items</div>
          <div className="bg-blue-500 p-2">Total Quantity</div>
          <div className="bg-blue-500 p-2">Total Payment (Rp)</div>
          <div className="bg-blue-500 p-2">Status</div>
          <div className="bg-blue-500 p-2">Checkout Date</div>
        </div>

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order.orderId} className="grid grid-cols-7 gap-4 items-center text-center mb-4">
              <div className="border border-gray-400 p-2 text-center">{index + 1}.</div>
              <div className="border border-gray-400 p-2 text-center">{order.orderId}</div>
              <div className="border border-gray-400 p-2 text-center">
                {order.products.map((product, idx) => (
                  <div key={idx}>{product.name} (x{product.quantity})</div>
                ))}
              </div>
              <div className="border border-gray-400 p-2 text-center">
                {order.products.reduce((total, product) => total + product.quantity, 0)}
              </div>
              <div className="border border-gray-400 p-2 text-center">{order.total.toLocaleString()}</div>
              <div className="border border-gray-400 p-2 text-center">{order.status}</div>
              <div className="border border-gray-400 p-2 text-center">{order.checkoutDate}</div>
            </div>
          ))
        ) : (
          <div className="border border-gray-400 p-2 text-center" colSpan="7">
            No order history found.
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
