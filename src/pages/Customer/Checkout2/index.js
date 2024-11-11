import React, { useState, useEffect } from "react";
import "./index.css";

function Checkout2() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

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
            for (const product of order.products) {
              const productDetails = await fetchProductDetails(product.productId);
              product.name = productDetails.name;
              product.image = productDetails.image;
              product.price = productDetails.price; // Hanya perbarui nama, gambar, dan harga
            }
          }
          setOrders(userOrders);
        }
      } catch (error) {
        console.error("Error:", error);
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
        <div className="grid grid-cols-5 gap-4 text-center text-lg font-semibold mb-4">
          <div className="bg-blue-500 p-2">Gambar Produk</div>
          <div className="bg-blue-500 p-2">Nama</div>
          <div className="bg-blue-500 p-2">Kuantitas</div>
          <div className="bg-blue-500 p-2">Price</div>
        </div>

        {orders.map((order) =>
          order.products.map((product, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 items-center text-center mb-4">
              <div className="flex justify-center">
                <img
                  alt={`Image of ${product.name}`}
                  className="rounded-full"
                  height={100}
                  src={product.image}
                  width={100}
                />
              </div>
              <div>{product.name}</div>
              <div>{product.quantity}</div>
              <div>{product.price}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Checkout2;
