import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Etalase() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {}; // Mengakses produk yang dikirim dari Dashboard
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleAddToCart = () => {
    // Hitung total harga
    const totalPrice = count * product.price;

    // Kirim data produk ke halaman Checkout
    navigate('/Checkout', {
      state: {
        product: {
          image: product.image,
          name: product.name,
          quantity: count,
          price: product.price,
          total: totalPrice
        }
      }
    });
  };

  return (
    <div>
      <header className="bg-blue-700 text-white text-center py-4">
        <h1 className="text-xl font-bold">
          WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
        </h1>
      </header>
      <nav className="bg-blue-700 text-white flex justify-end space-x-4 py-2 px-4">
        <a className="hover:underline" href="#">Home</a>
        <a className="hover:underline" href="#">Testimonial</a>
        <a className="hover:underline" href="#">History</a>
        <a className="hover:underline" href="#">Etalase</a>
        <i className="fas fa-user-circle text-2xl"></i>
      </nav>
      <main className="flex justify-center items-center py-8">
        <div className="text-center">
          {product && (
            <>
              <h2 className="bg-blue-600 text-white py-2 px-4 rounded">
                {product.name}
              </h2>
              <img
                alt={`Image of ${product.name}`}
                className="rounded-full mt-4"
                height={300}
                src={product.image}
                width={300}
              />
            </>
          )}
        </div>
        <div className="bg-white p-8 rounded shadow-lg ml-8">
          <h3 className="text-2xl font-bold mb-4">Informasi Produk</h3>
          <div className="flex justify-between mb-2">
            <span>Stok</span>
            <span>{product ? `${product.stock} Box` : 'N/A'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Harga</span>
            <span>{product ? `Rp. ${product.price} / 1 box` : 'N/A'}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Jumlah Ikan</span>
            <span>{count} Box</span>
          </div>
          <div className="flex items-center justify-center mb-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-l" onClick={increment}>+</button>
            <span className="px-4">{count}</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r" onClick={decrement}>-</button>
          </div>
          <div className="flex justify-between">
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart mr-2"></i>
              Tambahkan ke Keranjang
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Checkout</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Etalase;
