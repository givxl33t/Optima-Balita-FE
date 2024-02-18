import { useEffect } from "react";
import Consultation from "../components/Consultation";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ConsultatePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Consultation />
      </div>
      <Footer />
    </div>
  );
};

export default ConsultatePage;
