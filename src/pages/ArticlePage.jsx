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
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const fetchArticlesForCurrentPage = useQuery(
    ["articles", currentPage, 4, submittedQuery], // Step 4: Include search query in the query key
    () => fetchArticles(currentPage, 4, submittedQuery), // Step 4: Pass search query to fetchArticles
    {
      keepPreviousData: true,
      staleTime: 5000,

      // Step 5: Refetch data when search query changes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnPageChange: false,
      refetchOnSettle: false,
    }
  );

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery); // Update submitted query on form submission
    setCurrentPage(1);
  };


  if (fetchArticlesForCurrentPage.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
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
      <div className="flex flex-col items-center gap-10 py-2 pr-4 pl-4">
        <div className="sm:px-24">
        <div className="xl:mt-8 lg:mt-8 md:mt-8"><Breadcrumb items={breadcrumbItems} /></div>
          <h1 className="text-2xl font-semibold mb-8">Artikel Pilihan</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
            <div className="col-span-1">
              {randomArticles?.data?.slice(0, 1).map((article) => (
                <div key={article.id}>
                  <div className="max-w-3xl space-y-4">
                    <div className="relative">
                      <Link to={`/article/${article.slug}`}>
                        <img
                          src={article.image}
                          alt={`article pilihan ${article.slug}`}
                          className="rounded-lg h-1/2 w-[600px] hover:shadow-xl transition duration-300"
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
            <div className="overflow-y-auto max-h-[400px] overflow-x-hidden rounded">
                {randomArticles?.data?.map((article) => (
                  <div key={article.id} className="mb-4">
                    <Link to={`/article/${article.slug}`}>
                      <div className="max-w-xl flex gap-3">
                        <img
                          src={article.image}
                          alt={`article pilihan ${article.slug}`}
                          className="max-w-lg w-1/3 h-1/3 rounded-lg"
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
          <h1 className="text-2xl font-semibold mb-8 mr-10">Artikel Terbaru</h1>
          <form onSubmit={handleSubmit}>   
            <div className="relative xl:w-1/2 lg:w-full md:w-full sm:w-full mb-10">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" onChange={handleSearchChange} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Judul Artikel..."/>
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cari</button>
            </div>
          </form>
            {fetchArticlesForCurrentPage?.data?.data?.length === 0 ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                <div className="max-w-72 mx-auto flex flex-col h-full justify-between">
                  <h4 className="font-bold text-2xl w-96 sm:text-3xl text-slate-300">
                    Artikel Tidak Ditemukan
                  </h4>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {fetchArticlesForCurrentPage?.data?.data?.map((article) => (
                  <div
                    key={article.id}
                    className="max-w-72 mx-auto flex flex-col h-full justify-between border-slate-300 border-2 rounded-lg gap-3 shadow-lg hover:shadow-xl transition duration-300"
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
            )}
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
