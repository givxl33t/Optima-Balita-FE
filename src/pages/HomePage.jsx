import HeroBanner from "../components/landingpage/HeroBanner";
import About from "../components/landingpage/About";
import Article from "../components/landingpage/Article";
import Forum from "../components/landingpage/Forum";

import HomeNavbar from "../components/landingpage/HomeNavbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <HomeNavbar />
      <HeroBanner />
      <About />
      <Article />
      <Forum />
      <Footer />
    </>
  );
};

export default HomePage;
