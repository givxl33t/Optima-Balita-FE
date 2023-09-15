import { useContext } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";
import Footer from "../components/Footer";

const ArticlePage = () => {
  const { articles, isLoading } = useContext(ArticleContext);
  // eslint-disable-next-line no-unused-vars
  const [showAll, setShowAll] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(4);
  const breadcrumbItems = [
    {
      title: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
      ),
      url: "/",
    },
    { title: "Article" },
  ];

  const showMoreArticles = () => {
    setVisibleArticles(visibleArticles + 4);
  };

  const filteredArticles = articles?.filter(
    (article) => article.categori === "terbaru"
  );

  const displayedArticles = showAll
    ? filteredArticles
    : filteredArticles?.slice(0, visibleArticles);

  dayjs.extend(relativeTime);
  dayjs.locale("id");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="justify-center p-8 sm:px-24">
        <Breadcrumb items={breadcrumbItems} />
        <div>
          <h1 className="text-2xl font-bold mb-8">Artikel Pilihan</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="col-span-1">
              {articles
                ?.filter((article) => article.categori === "pilihan")
                .slice(0, 1)
                .map((article) => (
                  <div key={article.id} className="mb-5">
                    <div className="max-w-3xl space-y-4">
                      <div className="relative">
                        <Link to={`/article/${article.id}`}>
                          <img
                            src={article.image}
                            alt={`article pilihan ${article.id}`}
                            className="rounded-lg"
                          />
                          <h2 className="absolute bottom-0 rounded-b-lg bg-gradient-to-t from-black bg-opacity-40 left-0 w-full px-4 py-4 text-white text-lg font-semibold sm:text-2xl">
                            {article.title}
                          </h2>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="overflow-y-auto h-96 overflow-x-hidden">
              <div>
                {articles
                  ?.filter((article) => article.categori === "pilihan")
                  .map((article) => (
                    <div key={article.id} className="mb-4">
                      <Link to={`/article/${article.id}`}>
                        <div className="max-w-xl flex gap-3">
                          <img
                            src={article.image}
                            alt={`article pilihan ${article.id}`}
                            className="max-w-lg w-36 rounded-lg"
                          />
                          <div>
                            <h2 className="text-lg font-medium">
                              {article.title}
                            </h2>
                            <span className="text-md text-slate-500">
                              {dayjs(article.createdAt).fromNow()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-8 mt-12">Artikel Terbaru</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
            {displayedArticles.map((article) => (
              <div
                key={article.id}
                className="max-w-md border-slate-300 border-2 rounded-lg gap-3 shadow-lg"
              >
                <Link to={`/article/${article.id}`}>
                  <img
                    src={article.image}
                    alt={`article terbaru ${article.id}`}
                    className="rounded-t-md"
                  />
                  <div className="m-2">
                    <h2 className="text-lg font-medium line-clamp-3">{article.title}</h2>
                    <span className="text-md text-slate-500">
                      {dayjs(article.createdAt).fromNow()}
                    </span>
                    <p className="line-clamp-2">{article.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {!showAll && filteredArticles.length > visibleArticles && (
            <button
              className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded mt-4 float-right"
              onClick={showMoreArticles}
            >
              Tampilkan Lebih Banyak
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage;
