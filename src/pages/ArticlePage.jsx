import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchArticles } from "../utils/api";
import { ArticleContext } from "../contexts/ArticleContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const ArticlePage = () => {
  const { randomArticles } = useContext(ArticleContext);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArticlesForCurrentPage = useQuery(
    ["articles", currentPage, 4],
    () => fetchArticles(currentPage, 4)
  );

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (fetchArticlesForCurrentPage.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!Array.isArray(fetchArticlesForCurrentPage.data.data) || fetchArticlesForCurrentPage.data.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        Artikel tidak tersedia
      </div>
    );
  }

  const totalPages = fetchArticlesForCurrentPage.data?.meta?.page_size || 1;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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


  return (
    <>
      <Navbar />
      <div className="pt-8 sm:px-24"><Breadcrumb items={breadcrumbItems} /></div>
      <div className="flex flex-col items-center gap-10 py-2 sm:py-10">
        <div className="sm:px-24">
          <h1 className="text-2xl font-semibold mb-8">Artikel Pilihan</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="col-span-1">
              {randomArticles?.data?.slice(0, 1).map((article) => (
                <div key={article.id}>
                  <div className="max-w-3xl space-y-4">
                    <div className="relative">
                      <Link to={`/article/${article.slug}`}>
                        <img
                          src={article.image}
                          alt={`article pilihan ${article.slug}`}
                          className="rounded-lg max-h-96"
                        />
                        <h2 className="absolute bottom-0 rounded-b-lg bg-gradient-to-t from-black bg-opacity-40 left-0 w-full px-4 py-4 text-white text-lg font-semibold sm:text-2xl">
                          {article.title}
                        </h2>
                        {/* article description */}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-y-auto h-96 overflow-x-hidden">
                {randomArticles?.data?.map((article) => (
                  <div key={article.id} className="mb-4">
                    <Link to={`/article/${article.slug}`}>
                      <div className="max-w-xl flex gap-3">
                        <img
                          src={article.image}
                          alt={`article pilihan ${article.slug}`}
                          className="max-w-lg w-36 rounded-lg"
                        />
                        <div>
                          <h2 className="text-lg font-medium">{article.title}</h2>
                          <span className="text-md">
                            <p className="line-clamp-2">{article.description}</p>
                          </span>
                          <span className="text-md text-slate-500">
                            <p>Oleh {article.author} &#10242;{dayjs(article.created_at).locale("Id").format("DD MMMM YYYY")}</p>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="sm:px-24">
          <h1 className="text-2xl font-semibold mb-8">Artikel Terbaru</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
              {fetchArticlesForCurrentPage.data.data.map((article) => (
                <div
                  key={article.id}
                  className="w-72 border-slate-300 border-2 rounded-lg gap-3 shadow-lg"
                >
                  <Link to={`/article/${article.slug}`}>
                    <img
                      src={article.image}
                      alt={`article terbaru ${article.slug}`}
                      className="rounded-t-md"
                    />
                    <div className="m-2">
                      <h2 className="text-lg font-medium line-clamp-3">
                        {article.title}
                      </h2>
                      <span className="text-md text-slate-500">
                        {dayjs(article.created_at).locale("Id").format("DD MMMM YYYY")}
                      </span>
                      <p className="line-clamp-2">{article.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
        </div>
        {/* Pagination UI */}
        <nav aria-label="Page navigation example" className="flex justify-center">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageClick(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === index + 1
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage;
