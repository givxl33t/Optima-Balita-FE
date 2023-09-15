import HeroBanner from "../components/landingpage/HeroBanner"
import About from "../components/landingpage/About"
import Article from "../components/landingpage/Article"
import Forum from "../components/landingpage/Forum"

import NavbarPage from "../components/landingpage/NavbarPage"
import Footer from "../components/Footer"

const HomePage = () => {
  return (
    <>
      <NavbarPage/>
      <HeroBanner />
      <About />
      <Article />
      <Forum />
      <Footer/>
    </>
  )
}

export default HomePage