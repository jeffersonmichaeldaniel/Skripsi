import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentOption, setPaymentOption] = useState("");
  const [shippingOption, setShippingOption] = useState("");
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isPaymentInfoVisible, setIsPaymentInfoVisible] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (shippingOption === "delivery") {
      setShippingCost(5000);
    } else {
      setShippingCost(0);
    }
  }, [shippingOption]);

  const totalAmount = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  const totalPrice = totalAmount + shippingCost;

  const handleLanjutClick = (e) => {
    e.preventDefault();
    if (!paymentOption || !shippingOption || !address) {
      alert("Mohon lengkapi semua pilihan metode dan alamat.");
    } else {
      setIsPaymentInfoVisible(true);
    }
  };

  const handleCheckout = async () => {
    if (!paymentOption || !shippingOption || !address || !whatsappNumber) {
      alert("Mohon lengkapi semua informasi yang dibutuhkan.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID tidak ditemukan. Harap login terlebih dahulu.");
      navigate("/login");
      return;
    }

    // Logika untuk menentukan status pesanan
    let orderStatus = "Pending"; // Default status
    if (paymentOption === "banking" && shippingOption === "delivery") {
      orderStatus = "Menunggu Pembayaran dan Pengiriman";
    } else if (paymentOption === "cod" && shippingOption === "pickup") {
      orderStatus = "Menunggu Konfirmasi";
    } else if (paymentOption === "banking" && shippingOption === "pickup") {
      orderStatus = "Diproses";
    }

    const orderData = {
      userId,
      products: cart.map((product) => ({
        productId: product.productId,
        name: product.name,
        image: product.image,
        quantity: product.quantity,
        price: product.price,
      })),
      metodePengiriman: shippingOption === "delivery" ? "Kirim Ke Alamat" : "Ambil Ditempat",
      metodePembayaran: paymentOption === "banking" ? "Transaksi Banking" : "COD",
      phoneNumber: whatsappNumber,
      address,
      norek: paymentOption === "banking" ? accountNumber : "",
      ongkir: shippingCost,
      total: totalPrice,
      status: orderStatus,
      checkoutDate: new Date().toLocaleString(),
    };    

    try {
      const response = await fetch("https://vjay-chuang.vercel.app/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        setOrderId(result.orderId);
        setModalMessage("Terimaksi Sudah Memesan Produk Kami 😊🙏");
        setIsModalVisible(true);
        localStorage.removeItem("cart");
        // navigate("/Checkout2", { state: { orderId: result.orderId } });
      } else {
        alert("Gagal membuat pesanan. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    // Navigate to the next page after the modal is closed
    navigate("/Checkout2", { state: { orderId: orderId } });
  };

  return (
    <div>
      <header className="header-title">
        <h1 className="title">WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM</h1>
      </header>

      <div className="p-8 bg-blue-700">
        {/* Tampilkan data produk */}
        <div className="grid grid-cols-5 gap-4 text-center text-lg font-semibold mb-4">
          <div className="bg-blue-500 p-2">Gambar Produk</div>
          <div className="bg-blue-500 p-2">Nama</div>
          <div className="bg-blue-500 p-2">Kuantitas</div>
          <div className="bg-blue-500 p-2">Harga (Rp) / Box</div>
          <div className="bg-blue-500 p-2">Total (Rp)</div>
        </div>

        {cart.map((product, index) => (
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
            <div>{product.price.toLocaleString()}</div>
            <div>{(product.price * product.quantity).toLocaleString()}</div>
          </div>
        ))}

        <hr className="border-gray-400 mb-4" />

        {/* Informasi Total Produk */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-500 p-4">
            <h2 className="font-semibold mb-2">Informasi Total Produk :</h2>
            <div className="bg-blue-600 p-2 mb-2">
              Sub Total: Rp.{totalAmount.toLocaleString()}
            </div>
            <div className="bg-blue-600 p-2 mb-2">Ongkir: Rp. {shippingCost.toLocaleString()}</div>
            <div className="bg-blue-600 p-2">
              Total: Rp.{totalPrice.toLocaleString()}
            </div>
          </div>

          {/* Pilihan Metode Pembayaran dan Pengiriman */}
          {!isPaymentInfoVisible ? (
            <div className="bg-blue-500 p-4">
              <div className="header">
                <div>
                  <div className="header-metode">
                    <h3>Metode Pembayaran :</h3>
                    <div className="header-pay-metode">
                      <input type="radio" name="paymentOption" value="banking" onChange={(e) => setPaymentOption(e.target.value)} />
                      <h3>Transaksi Banking</h3>
                    </div>
                    <div className="header-pay-metode">
                      <input type="radio" name="paymentOption" value="cod" onChange={(e) => setPaymentOption(e.target.value)} />
                      <h3>Cash on Delivery</h3>
                    </div>
                  </div>
                  <div className="header-metode">
                    <h3>Metode Pengiriman :</h3>
                    <div className="header-pay-metode">
                      <input type="radio" name="shippingOption" value="pickup" onChange={(e) => setShippingOption(e.target.value)} />
                      <h3>Ambil Ditempat</h3>
                    </div>
                    <div className="header-pay-metode">
                      <input type="radio" name="shippingOption" value="delivery" onChange={(e) => setShippingOption(e.target.value)} />
                      <h3>Kirim Ke Alamat</h3>
                    </div>
                  </div>
                </div>
                <div className="header-input">
                  <textarea id="comment" placeholder="Alamat Pengiriman..." onChange={(e) => setAddress(e.target.value)} required></textarea>
                  <button className="button-lanjut" type="button" onClick={handleLanjutClick}>
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-500 p-4">
              <h3>Informasi Pembayaran</h3>
              {paymentOption === "banking" && (
                <div>
                  <input className="input-number" type="number" placeholder="No Rekening..." onChange={(e) => setAccountNumber(e.target.value)} required />
                </div>
              )}
              <div>
                <input className="input-number" type="number" placeholder="No WhatsApp..." onChange={(e) => setWhatsappNumber(e.target.value)} required />
              </div>
              <button className="button-Checkout" type="button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          )}
        </div>
        {/* Modal */}
        {isModalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-text">{modalMessage}</h2>
              <button className="modal-close" onClick={closeModal}>OKE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
