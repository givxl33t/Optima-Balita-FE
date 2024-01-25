import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BMICalculator from "../components/bmi/BMICalculator";

const BmiPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <BMICalculator />
      </div>
      <Footer />
    </div>
  );
};

export default BmiPage;
