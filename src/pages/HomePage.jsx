import HeroBanner from "../components/landingpage/HeroBanner";
import About from "../components/landingpage/About";
import Article from "../components/landingpage/Article";
import Forum from "../components/landingpage/Forum";

import HomeNavbar from "../components/landingpage/HomeNavbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <div className="flex-grow">
        <HeroBanner />
        <About />
        <Article />
        <Forum />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
