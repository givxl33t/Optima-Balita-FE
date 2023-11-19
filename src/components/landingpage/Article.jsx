import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArticleContext } from "../../contexts/ArticleContext";

const Article = () => {
  const { articles, isLoading } = useContext(ArticleContext);

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

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Adjust the number of slides to show based on your design
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

  return (
    <div className="mx-auto">
      {/* Center the content */}
      <div className="text-center">
        <h4 className="font-bold mb-4 text-3xl text-teal-600">Artikel</h4>
        <p className="text-lg text-slate-800 mb-4">
          Temukan berbagai informasi menarik tentang stunting
        </p>
        <Slider {...settings}>
          {articles.data.map((article) => (
            <div key={article.id} className="mb-4">
              <a href={`/article/${article.id}`}>
                <div className="max-w-xl flex flex-col items-center">
                  <img
                    src={article.image}
                    alt={`article pilihan ${article.id}`}
                    className="max-w-lg w-36 rounded-lg mb-2"
                  />
                  <div>
                    <h2 className="text-lg font-medium">{article.title}</h2>
                    <span className="text-md text-slate-500">
                      {article.created_at}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
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
