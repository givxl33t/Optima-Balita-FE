import { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ArticleContext } from "../../contexts/ArticleContext";

const Article = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const { articles } = useContext(ArticleContext);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0 || articles.length === 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current ||
        articles?.length === 0
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, [currentIndex]);

  return (
    <>
      <div className="text-center">
        <h4 className="font-bold mb-4 text-3xl text-teal-600">Artikel</h4>
        <p className="text-lg text-slate-800 mb-4">
          Temukan berbagai informasi menarik tentang stunting
        </p>
      </div>
      <div className="carousel my-16 mx-20">
        <div className="relative overflow-hidden">
          <div className="flex justify-between absolute top left w-full h-full">
            <button
              onClick={movePrev}
              className="hover:bg-teal-500/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled("prev")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-20 -ml-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="sr-only">Prev</span>
            </button>
            <button
              onClick={moveNext}
              className="hover:bg-teal-500/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled("next")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-20 -ml-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="sr-only">Next</span>
            </button>
          </div>
          {articles?.length > 0 ? (
            <div
              ref={carousel}
              className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
            >
              {articles.slice(0, 10).map((article, index) => {
                return (
                  <div
                    key={index}
                    className="carousel-item text-center relative w-64 h-64 snap-start"
                  >
                    <a
                      href={`article/${article.id}`}
                      className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                      style={{ backgroundImage: `url(${article.image || ""})` }}
                    >
                      <img
                        src={article.image || ""}
                        alt={article.title}
                        className="w-full aspect-square hidden"
                      />
                    </a>
                    <a
                      href={`article/${article.id}`}
                      className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-teal-500/75 z-10"
                    >
                      <h3 className="text-white py-6 px-3 mx-auto text-xl">
                        {article.title}
                      </h3>
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <p>Loading articles...</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button className="py-3 px-5 text-lg bg-gradient-to-r from-teal-600 to-teal-300 rounded-full font-semibold text-white">
          <NavLink to="/article">Baca Selengkapnya</NavLink>
        </button>
      </div>
    </>
  );
};

export default Article;
