/* eslint-disable react/prop-types */
import { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArticleContext } from "../../contexts/ArticleContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ArticleCard = ({ article }) => (
  <div key={article.id} className="p-3">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <a href={`/article/${article.slug}`}>
        <img
          src={article.image}
          alt={`article pilihan ${article.slug}`}
          className="max-w-full h-auto rounded-t-md"
        />
        <div className="p-4">
          <h2 className="text-lg font-medium mb-2">{article.title}</h2>
          <span className="text-md text-slate-500">{article.author}</span>
        </div>
      </a>
    </div>
  </div>
);

const Article = () => {
  const { articles, isLoading } = useContext(ArticleContext);
  const sliderRef = useRef(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!Array.isArray(articles.data) || articles.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        Artikel tidak tersedia
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
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

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="mx-auto">
      <div className="text-center relative">
        <h4 className="font-bold mb-4 text-3xl text-teal-600">Artikel</h4>
        <p className="text-lg text-slate-800 mb-4">
          Temukan berbagai informasi menarik tentang stunting
        </p>
        <Slider {...settings} className="mx-auto max-w-2xl p-1" ref={sliderRef}>
          {articles.data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Slider>
        <div className="absolute top-1/2 transform -translate-y-1/2 left-10 p-10">
          <button
            className="py-3 px-5 text-lg bg-gradient-to-r from-teal-600 to-teal-300 rounded-full font-semibold text-white mr-4"
            onClick={goToPrev}
          >
            <FaChevronLeft /> {/* Replace "Prev" with left arrow icon */}
          </button>
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 right-10 p-10">
          <button
            className="py-3 px-5 text-lg bg-gradient-to-r from-teal-600 to-teal-300 rounded-full font-semibold text-white"
            onClick={goToNext}
          >
            <FaChevronRight /> {/* Replace "Next" with right arrow icon */}
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button className="py-3 px-5 text-lg bg-gradient-to-r from-teal-600 to-teal-300 rounded-full font-semibold text-white">
          <NavLink to="/article">Baca Selengkapnya</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Article;
