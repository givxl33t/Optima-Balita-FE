import { useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import GoogleMapReact from "google-map-react";
import FotoPuskesmasImg from "../../assets/foto-puskesmas.jpg";

const LocationPin = ({ text }) => (
  <div className="flex w-[180px]">
    <MdLocationPin className="w-12 h-12 text-slate-500"  />
    <p className="pin-text">{text}</p>
  </div>
)

const DetailPuskesmas = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  return (
    <>
      <div className="bg-white pt-5" id="detailpuskesmas">
        <div className="container py-lg-5">
          <div 
            className="flex flex-col md:flex-row justify-right items-center mt-3"
            data-aos="fade-up"
          >
            <div className="md:w-1/2 mb-4 md:mb-0">
              <img
                src={FotoPuskesmasImg}
                className="mt-5 w-3/4 rounded-xl md:justify-center mx-auto"
                alt="about image"
              />
            </div>
            <div className="md:w-[500px] p-4" data-aos="fade-up">
              <h4 className="font-bold mb-3 text-2xl sm:text-3xl">
                UPT Puskesmas Dukuhseti
              </h4>
              <p className="font-normal mb-3 text-md sm:text-lg text-gray-800">
                UPT Puskesmas Dukuhseti merupakan suatu kesatuan organisasi kesehatan
                fungsional yang merupakan pusat pengembangan kesehatan masyarakat
                yang juga berfungsi memberi pelayanan secara menyeluruh dan terpadu
                kepada masyarakat di kecamatan Dukuhseti. Puskesmas Dukuhseti terletak
                di Kecamatan Dukuhseti yang berjarak 37 km dari pusat kota Pati.
              </p>
            </div>
            <div className="min-w-72 h-64 p-4" data-aos="fade-up">
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBudN-V7ZMxiYJXGvJAlx3J-791Ca-eoJg" }}
                defaultCenter={{ lat: -6.47494131050319, lng: 111.03787375147829 }}
                defaultZoom={12}
              >
                <LocationPin
                  lat={-6.47494131050319}
                  lng={111.03787375147829}
                  text="Jl. Tayu - Puncel No.8, Brang Lor, Alasdowo, Kec. Dukuhseti, Kabupaten Pati"
                />
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPuskesmas;
