import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css";

function Etalase() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Ambil data keranjang dari localStorage setiap kali halaman dimuat
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const incrementQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // Simpan perubahan ke localStorage
  };

  const decrementQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart)); // Simpan perubahan ke localStorage
    }
  };

  const removeProduct = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // Simpan perubahan ke localStorage
  };

  const handleCheckout = () => {
    navigate('/Checkout', {
      state: { cart }
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
      <main className="py-8">
        {cart.length === 0 ? (
          <p className="text-center text-lg">Keranjang Anda kosong.</p>
        ) : (
          <div className="flex flex-wrap justify-center">
            {cart.map((product, index) => (
              <div key={index} className="bg-white p-4 m-4 rounded shadow-lg text-center">
                <img
                  alt={`Image of ${product.name}`}
                  className="rounded-full"
                  height={150}
                  src={product.image}
                  width={150}
                />
                <h3 className="text-xl font-bold mt-4">{product.name}</h3>
                <p>Stok: {product.stock}Box</p>
                <p>Harga: Rp. {product.price} / 1 box</p>
                <p>Jumlah Ikan: {product.quantity} box</p>
                <div className="flex justify-center items-center mt-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-l"
                    onClick={() => decrementQuantity(index)}
                  >
                    -
                  </button>
                  <span className="px-4">{product.quantity}</span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-r"
                    onClick={() => incrementQuantity(index)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                  onClick={() => removeProduct(index)}
                >
                  Hapus Produk
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="text-center mt-8">
            <button
              className="bg-blue-600 text-white px-8 py-4 rounded"
              onClick={handleCheckout}
            >
              Lanjutkan ke Checkout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Etalase;
