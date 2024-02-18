import { useEffect } from "react";
import HeroBanner from "../components/landingpage/HeroBanner";
import DetailPuskesmas from "../components/landingpage/DetailPuskesmas";
import About from "../components/landingpage/About";
import Article from "../components/landingpage/Article";
import Forum from "../components/landingpage/Forum";

import HomeNavbar from "../components/landingpage/HomeNavbar";
import Footer from "../components/Footer";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <div className="flex-grow">
        <HeroBanner />
        <About />
        <DetailPuskesmas />
        <Article />
        <Forum />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
