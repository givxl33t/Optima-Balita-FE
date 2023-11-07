import React from "react";
import FotoDokter from "../assets/img/bg_hero.jpg";
import { FaWhatsapp } from "react-icons/fa";

const Consultation = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto flex justify-center">
        <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <img
              src={FotoDokter}
              alt="Foto Dokter"
              className="w-32 h-32 mx-auto rounded-full"
            />
            <h1 className="text-2xl font-bold mt-4">Nama Doktor</h1>
            <p className="text-gray-500">Ahli Gizi </p>
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-400 text-white rounded-full flex items-center justify-center">
                <FaWhatsapp size={32} />{" "}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">Hubungi Sekarang</h2>
                <p className="text-gray-500">Melalui WhatsApp</p>
              </div>
            </div>
            <a
              href="https://wa.me/1234567890"
              className="block bg-teal-500 text-white text-center mt-6 py-2 rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
