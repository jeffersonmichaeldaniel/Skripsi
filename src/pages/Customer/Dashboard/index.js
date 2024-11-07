import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';

function Dashboard() {
  const navigate = useNavigate();
  const menuProductRef = useRef(null);
  const [products, setProducts] = useState([]);

  const handleEtalase = (product) => {
    navigate('/Etalase', { state: { product } });
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://joki-chuang.vercel.app/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const scrollToMenuProduct = () => {
    if (menuProductRef.current) {
      menuProductRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div>
      <header className="bg-blue-800 py-4" id="navbar">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">
            WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
          </h1>
          <nav className="space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="/History" className="hover:underline">History</a>
            <a 
              href="#" 
              className="hover:underline"
              onClick={scrollToMenuProduct}
            >
              Etalase
            </a>
            <a href="/Checkout2">
              <i className="fas fa-shopping-cart cart-icon"></i>
            </a>
            <a href="#">
              <i className="fas fa-user-circle" />
            </a>
          </nav>
        </div>
      </header>
      <main className="container mx-auto text-center py-16">
        <h2 className="text-4xl font-bold mb-4">
          Tersedia Ikan Frozen untuk Dipesan!
        </h2>
        <div className="header-explane">
          <h3 className="explanation">
            The New Fish Product with a best quality meat & affordable price for consumers. Enjoy the taste of the authentic food 
          </h3>
        </div>
        <button 
          className="bg-blue-700 text-white py-2 px-4 rounded-full mb-8"
          onClick={scrollToMenuProduct}
        >
          Choose your Product
        </button>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-blue-700 py-4 rounded">
            <p className="text-2xl font-bold">20++</p>
            <p>Penjualan</p>
          </div>
          <div className="bg-blue-700 py-4 rounded">
            <p className="text-2xl font-bold">13</p>
            <p>Jenis Ikan</p>
          </div>
          <div className="bg-blue-700 py-4 rounded">
            <p className="text-2xl font-bold">20++</p>
            <p>Berlangganan</p>
          </div>
          <div className="bg-blue-700 py-4 rounded">
            <p className="text-2xl font-bold">10%</p>
            <p>Lebih Murah</p>
          </div>
        </div>
      </main>
      <div ref={menuProductRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="relative">
              <img
                alt={product.name}
                className="w-full h-auto border-4 border-gray-300"
                height={150}
                src={product.image} 
                width={150}
              />
              <h2 className="text-center mt-2">{product.name}</h2>
              <button 
                className="block mx-auto mt-2 bg-blue-500 text-white py-1 px-4 rounded"
                onClick={() => handleEtalase(product)} // Pass the product here
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
