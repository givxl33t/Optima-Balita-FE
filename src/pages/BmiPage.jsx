import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BmiCalculator } from "../components/bmicalculator";

const BmiPage = () => {
  return (
    <>
      <Navbar />
      <BmiCalculator />
      <Footer />
    </>
  );
};

export default BmiPage;
