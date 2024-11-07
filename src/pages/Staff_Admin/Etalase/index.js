import React from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';

function EtalaseAdmin() {
  const navigate = useNavigate();
  const addItem = () => {
    navigate('/FormAdmin');
  };
  const items = [
    {
      nomor: 1,
      nama: "Ikan Tude",stok: 10,
      harga: "Rp. 10.000",
      gambar: "https://storage.googleapis.com/a1aa/image/vBvLqXalPO63IZJredUm16zn7Dz80rLQQiaeobYBH6Fr1ilTA.jpg",
    },
    {
      nomor: 2,
      nama: "Ikan Cakalang",stok: 15,
      harga: "Rp. 50.000",
      gambar: "https://storage.googleapis.com/a1aa/image/dpGzxcAONgJHHJH4i2pneZnAEMwhTQwweG0YMgywx53x1ilTA.jpg",
    },
    {
      nomor: 3,
      nama: "Ikan Deho",stok: 5,
      harga: "Rp. 43.000",
      gambar: "https://storage.googleapis.com/a1aa/image/HZfkHCmFUZyIIqxsGCeggnkn566kUlkmrtegluIjfz8lWLWOB.jpg",
    },
    {
      nomor: 4,
      nama: "Ikan Pani",stok: 8,
      harga: "Rp. 62.000",
      gambar: "https://storage.googleapis.com/a1aa/image/Cze70Y7cBixzcyw4KH0996TDFOeT2Tz7IhXUMiFdLIDv1ilTA.jpg",
    },
    {
      nomor: 5,
      nama: "Ikan Tongkol",stok: 12,
      harga: "Rp. 35.000",
      gambar: "https://storage.googleapis.com/a1aa/image/PHS3fDPiZU1TUSl06yuYJB8hjefGmO9y5evZS39ku6AyWLWOB.jpg",
    },
    {
      nomor: 6,
      nama: "Ikan Melalugis",stok: 3,
      harga: "Rp. 38.000",
      gambar: "https://storage.googleapis.com/a1aa/image/YOf5d8OB6ISJcijOqtBVWeGZ3GPqJOklEp3dJFeeRzZ6WLWOB.jpg",
    },
  ];

  return (
    <div className="background">
      <header className="header-navbar">
        <div className="header-title">
          <h3 className="title">FORM ADMIN</h3>
        </div>
        <button className="button">Dashboard</button>
        <button className="button">Transaksi</button>
        <button className="button">Etalase</button>
        <button className="button">Laporan Penjualan</button>
      </header>
      <div className="line" />
      <div className="flex justify-between items-center mb-8">
        <h2 className="titlepage">Etalase</h2>
      </div>
      <div className="overflow-x-auto"> 
        <div className="header-title">
          <h3 className="title">Show</h3>
          <input className="input-angka" />
          <h3 className="title" id="entries">Entries</h3>
          <h3 className="title">Search</h3>
          <input className="input-search" />
          <button onClick={addItem}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nomor</th>
              <th className="border px-4 py-2">Nama Item</th>
              <th className="border px-4 py-2">Stok</th>
              <th className="border px-4 py-2">Harga</th>
              <th className="border px-4 py-2">Gambar</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.nomor}>
                <td className="border px-4 py-2">{item.nomor}</td>
                <td className="border px-4 py-2">{item.nama}</td>
                <td className="border px-4 py-2">{item.stok}</td>
                <td className="border px-4 py-2">{item.harga}</td>
                <td className="border px-4 py-2">
                  <img src={item.gambar} alt={item.nama} className="gambar" />
                </td>
                <td className="border px-4 py-2">
                  <div className="flex flex-col items-center space-y-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EtalaseAdmin;
