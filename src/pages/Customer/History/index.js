import React from "react";
import { useNavigate } from 'react-router-dom';
import Dashboard from "../Dashboard";

function History() {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleLogin = () => {
    // Anda bisa menambahkan logika untuk login di sini
    navigate('/Dashboard'); // Arahkan ke halaman dashboard
  };
  return (
    <div>
      <header className="bg-blue-800 py-4" id="navbar">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">
            WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
          </h1>
          <nav className="space-x-4">
            <a href="/Dashboard" className="hover:underline">
              Home
            </a>
            <a href="#" className="hover:underline">
              History
            </a>
            <a href="#" className="hover:underline">
              Etalase
            </a>
            <a href="/Checkout2">
              <i class="fas fa-shopping-cart cart-icon"></i>
            </a>
            <a href="#">
              <i className="fas fa-user-circle" />
            </a>
          </nav>
        </div>
      </header>
      <main className="p-8">
        <table className="w-full bg-white text-black border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2">#</th>
              <th className="border border-gray-400 p-2">Transaction id</th>
              <th className="border border-gray-400 p-2">Item</th>
              <th className="border border-gray-400 p-2">Total Quantity</th>
              <th className="border border-gray-400 p-2">(Rp) Total Bayar</th>
              <th className="border border-gray-400 p-2">Status</th>
              <th className="border border-gray-400 p-2">Checkout data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-2 text-center">1.</td>
              <td className="border border-gray-400 p-2 text-center">118</td>
              <td className="border border-gray-400 p-2 text-center">
                Ikan Cakalang
              </td>
              <td className="border border-gray-400 p-2 text-center">1</td>
              <td className="border border-gray-400 p-2 text-center">10.000</td>
              <td className="border border-gray-400 p-2 text-center">
                Ready for Pickup
              </td>
              <td className="border border-gray-400 p-2 text-center">
                2024-08-15 11:34:25
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2 text-center">2.</td>
              <td className="border border-gray-400 p-2 text-center">119</td>
              <td className="border border-gray-400 p-2 text-center">
                Ikan Tude
              </td>
              <td className="border border-gray-400 p-2 text-center">2</td>
              <td className="border border-gray-400 p-2 text-center">10.000</td>
              <td className="border border-gray-400 p-2 text-center">
                Waiting for Payment
              </td>
              <td className="border border-gray-400 p-2 text-center">
                2024-09-9 11:34:25
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default History;
