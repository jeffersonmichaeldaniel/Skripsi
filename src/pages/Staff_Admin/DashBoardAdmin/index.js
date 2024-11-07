import React from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';

function DashboardAdmin() {
  const navigate = useNavigate();

  const navigasiTransaksi = () => {
    navigate('/Transaksi'); // Navigasi ke halaman transaksi
  };
  const navigasiEtalaseAdmin = () => {
    navigate('/EtalaseAdmin'); // Navigasi ke halaman transaksi
  };

  return (
    <div className="background">
      <header className="header-navbar">
        <div className="header-title">
          <h3 className="title">FORM ADMIN</h3>
        </div>
        <button className="button">Dashboard</button>
        <button className="button" onClick={navigasiTransaksi}>Transaksi</button>
        <button className="button" onClick={navigasiEtalaseAdmin}>Etalase</button>
        <button className="button">Laporan Penjualan</button>
      </header>
      <div className="line" />
      <h2 className="titlepage">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-box fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Jumlah Produk</h3>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-dollar-sign fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Pendapatan / Hari ini</h3>
              <p>16.483.000Rp</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-truck fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Transaksi COD</h3>
              <p>18.295.000Rp</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-times-circle fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Transaksi Cancelled</h3>
              <p>4 Cancelled</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-shopping-cart fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">In Cart</h3>
              <p>10</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-check-circle fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Transaksi Selesai</h3>
              <p>13 Sukses</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded col-span-3">
          <div className="flex items-center space-x-2">
            <i className="fas fa-comments fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Customer</h3>
              <p>5 Comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
