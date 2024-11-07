import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const [isPaymentInfoVisible, setIsPaymentInfoVisible] = useState(false);

  const [paymentOption, setPaymentOption] = useState("");
  const [shippingOption, setShippingOption] = useState("");
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const handleLanjutClick = () => {
    setIsPaymentInfoVisible(true);
  };

  const handleCheckout = async () => {
    const orderData = {
      product: {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        total: product.price * product.quantity,
      },
      paymentOption,
      shippingOption,
      address,
      accountNumber,
      whatsappNumber,
      shippingCost: 10000,
      totalAmount: product.price * product.quantity + 10000,
    };

    try {
      const response = await fetch('https://joki-chuang.vercel.app/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Pesanan berhasil dibuat!");
        navigate('/Checkout2');
      } else {
        alert("Gagal membuat pesanan. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <header className="header-title">
        <h1 className="title">
          WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
        </h1>
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
              Sub Total: Rp.{(product.price * product.quantity).toLocaleString()}
            </div>
            <div className="bg-blue-600 p-2 mb-2">Ongkir: Rp. 10.000</div>
            <div className="bg-blue-600 p-2">
              Total: Rp.{((product.price * product.quantity) + 10000).toLocaleString()}
            </div>
          </div>

          {!isPaymentInfoVisible ? (
            <div className="bg-blue-500 p-4">
              <div className="header">
                <div>
                  <div className="header-metode">
                    <h3>Metode Pembayaran :</h3>
                    <div className="header-pay-metode">
                      <input type="radio" name="paymentOption" value="banking" aria-label="Transaksi Banking" onChange={(e) => setPaymentOption(e.target.value)} />
                      <h3 className="pilihan">Transaksi Banking</h3>
                    </div>
                    <div className="header-pay-metode">
                      <input type="radio" name="paymentOption" value="cod" aria-label="Cash on Delivery" onChange={(e) => setPaymentOption(e.target.value)} />
                      <h3 className="pilihan">Cash on Delivery</h3>
                    </div>
                  </div>
                  <div className="header-metode">
                    <h3>Metode Pengiriman :</h3>
                    <div className="header-pay-metode">
                      <input type="radio" name="shippingOption" value="pickup" aria-label="Ambil Ditempat" onChange={(e) => setShippingOption(e.target.value)} />
                      <h3 className="pilihan">Ambil Ditempat</h3>
                    </div>
                    <div className="header-pay-metode">
                      <input type="radio" name="shippingOption" value="delivery" aria-label="Kirim Ke Alamat" onChange={(e) => setShippingOption(e.target.value)} />
                      <h3 className="pilihan">Kirim Ke Alamat</h3>
                    </div>
                  </div>
                </div>
                <div className="header-input">
                  <textarea id="comment" name="comment" rows="4" cols="50" placeholder="Alamat Pengiriman..." onChange={(e) => setAddress(e.target.value)}></textarea>
                  <button className="button-lanjut" type="button" onClick={handleLanjutClick}>
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-500 p-4">
              <h3>Informasi Pembayaran</h3>
              <div>
                <input className="input-number" type="number" placeholder="No Rekening..." onChange={(e) => setAccountNumber(e.target.value)} />
              </div>
              <div>
                <input className="input-number" type="number" placeholder="No WhatsApp..." onChange={(e) => setWhatsappNumber(e.target.value)} />
              </div>
              <button className="button-Checkout" type="button" onClick={handleCheckout}>Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
