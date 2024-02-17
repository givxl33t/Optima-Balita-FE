import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TentangKamiImg from "../../assets/tentang-kami.png";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  return (
    <>
      <div className="bg-white pt-5 xl:pt-20" id="about">
        <div className="container py-lg-5">
          <div 
            className="flex flex-col md:flex-row justify-center items-center mt-3"
            data-aos="fade-up"
          >
            <div className="md:w-1/2 mb-4 md:mb-0">
              <img
                src={TentangKamiImg}
                className="mt-5 w-3/4 md:w-100 rounded-lg md:justify-center mx-auto"
                alt="about image"
              />
            </div>
            <div className="md:w-1/2 p-4">
              <div data-aos="fade-up">
                <h4 className="font-bold mb-3 text-2xl sm:text-3xl">
                  Tentang Optima Balita
                </h4>
                <p className="font-normal mb-3 text-md sm:text-lg text-gray-800">
                  Optima Balita merupakan sebuah website yang bergerak di bidang
                  kesehatan. Website ini menyediakan berbagai fitur yang dapat
                  digunakan secara gratis oleh pengguna. Optima Balita hadir
                  untuk berbagi informasi penting mengenai stunting kepada
                  pengguna dan menyediakan ruang diskusi bagi pengguna yang
                  mengalami kesulitan, baik dalam pencegahan stunting maupun
                  pengobatan stunting. Website ini dikembangkan untuk melayani
                  kesehatan balita pada wilayah kerja UPT Puskesmas Dukuhseti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
