import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Limit phoneNumber input to digits only
    if (name === "phoneNumber" && !/^\d*$/.test(value)) return;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log data formulir ke konsol sebelum mengirim
    console.log("Data yang dikirim:", formData);
  
    try {
      const response = await fetch("https://joki-chuang.vercel.app/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Pendaftaran berhasil, data dikirim ke database:", formData);
        toast.success("Registrasi berhasil!", { position: "top-center" });
        setFormData({ username: "", email: "", password: "", phoneNumber: "" });
  
        // Delay selama 2 detik sebelum mengalihkan
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registrasi gagal", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.", { position: "top-center" });
    }
  };
  

  return (
    <div>
      <ToastContainer />
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">
          WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
        </h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Testimonial</a>
          <a href="#" className="hover:underline">History</a>
          <a href="#" className="hover:underline">Etalase</a>
        </nav>
        <div className="text-white">
          <i className="fas fa-user-circle text-2xl" />
        </div>
      </header>
      <main className="flex justify-center items-center h-screen">
        <div className="bg-blue-700 p-10 rounded-lg shadow-lg text-center w-96">
          <div className="text-white mb-6">
            <i className="fas fa-user-circle text-6xl" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">
            Register your Account!
          </h2>
          <p className="text-white mb-6">
            Already have an account on this website?{" "}
            <a href="/login" className="underline">Log in</a>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Nama Lengkap"
              value={formData.username}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 bg-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 bg-gray-300 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 bg-gray-300 rounded"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 bg-gray-300 rounded"
            />
            <button type="submit" className="block w-full p-3 bg-gray-300 rounded">
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Register;
