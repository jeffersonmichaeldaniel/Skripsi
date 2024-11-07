import React from "react";

function Checkout2() {
  // Data dummy sebagai pengganti basis data
  const product = {
    name: "Ikan Salmon",
    image: "https://via.placeholder.com/100", // URL gambar dummy
    quantity: 2, // Kuantitas produk
    price: 75000, // Harga per kg
  };

  return (
    <div>
      <header className="header-title">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">
            WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
          </h1>
          <nav className="space-x-4">
            <a href="/Dashboard" className="hover:underline">Home</a>
            <a href="/History" className="hover:underline">History</a>
            <a href="#" className="hover:underline">
              Etalase
            </a>
            <a href="#">
              <i className="fas fa-shopping-cart cart-icon"></i>
            </a>
            <a href="#">
              <i className="fas fa-user-circle" />
            </a>
          </nav>
        </div>
      </header>
      <div className="p-8 bg-blue-700">
        <div className="grid grid-cols-5 gap-4 text-center text-lg font-semibold mb-4">
          <div className="bg-blue-500 p-2">Gambar Produk</div>
          <div className="bg-blue-500 p-2">Nama</div>
          <div className="bg-blue-500 p-2">Kuantitas</div>
          <div className="bg-blue-500 p-2">Harga (Rp) / Kg</div>
          <div className="bg-blue-500 p-2">Total (Rp)</div>
        </div>
        {product && (
          <div className="grid grid-cols-5 gap-4 items-center text-center mb-4">
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
            <div>{product.price.toLocaleString()}</div>
            <div>{(product.price * product.quantity).toLocaleString()}</div>
          </div>
        )}
        <hr className="border-gray-400 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-500 p-4">
            <h2 className="font-semibold mb-2">Informasi Total Produk :</h2>
            <div className="bg-blue-600 p-2 mb-2">
              <h3>Sub Total: Rp. {(product.price * product.quantity).toLocaleString()}</h3>
            </div>
            <div className="bg-blue-600 p-2 mb-2">Ongkir: Rp. 10.000</div>
            <div className="bg-blue-600 p-2">
              <h3>Total: Rp. {((product.price * product.quantity) + 10000).toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout2;
