/* eslint-disable react/prop-types */
import { FaWhatsapp } from "react-icons/fa";
import { useContext, useEffect, useRef } from "react";
import { ConsultantContext } from "../contexts/ConsultantContext";
import Slider from "react-slick";

const ConsultantCard = ({ consultant }) => (
  <div className="p-2" key={consultant.id}>
    <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center">
        <img
          src={consultant.consultant_profile}
          alt="Foto Dokter"
          className="w-32 h-32 mx-auto rounded-full"
        />
        <h1 className="text-2xl font-bold mt-4">{consultant.consultant_username}</h1>
        <p className="text-gray-500">{consultant.consultant_description}</p>
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
          href={`https://wa.me/${consultant.consultant_phone}`}
          className="block bg-teal-500 text-white text-center mt-6 py-2 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Chat via WhatsApp
        </a>
      </div>
    </div>
  </div>
);

const Consultation = () => {
  const { consultants, isLoading, refetch } = useContext(ConsultantContext);
  const sliderRef = useRef(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  

  return (
    <div className="py-16 lg:grid-cols-3 xl:grid-cols-4 sm:px-24">
      <Slider {...settings} className="mx-auto max-w-2xl" ref={sliderRef}>
        {consultants?.data?.map((consultant) => (
          <ConsultantCard key={consultant.id} consultant={consultant} />
        ))}
      </Slider>
    </div>
  )
};

export default Consultation;
