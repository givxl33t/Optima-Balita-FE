import { useContext } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { ArticleContext } from "../contexts/ArticleContext";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";

function ArticleDetail() {
  const { articles, isLoading } = useContext(ArticleContext);
  const { id } = useParams();
  const article = articles.find((article) => article.id === id);
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
    { title: "Article", url: "/article" },
    { title: article ? article.title : "Article Title" },
  ];

  dayjs.extend(relativeTime);
  dayjs.locale("id");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-10 py-2 sm:py-10">
        <div className="sm:space-x-24">
          <div className="fixed bottom-20 md:fixed md:bottom-auto float-right items-center bg-white p-2 rounded-md shadow-md shadow-slate-300 my-auto sm:bg-transparent sm:shadow-none">
            <div className="flex flex-col space-y-4">
              <FacebookShareButton url="{window.location.href}">
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <TwitterShareButton url="{window.location.href}">
                <TwitterIcon size={36} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={window.location.href}
                quote={"Dapatkan informasi lengkap stunting"}
                hashtag="#StuntingCenter"
              >
                <WhatsappIcon size={36} round />
              </WhatsappShareButton>
            </div>
          </div>
          <div className="sm:max-w-2xl w-full px-4">
            <Breadcrumb items={breadcrumbItems} />
            {article ? (
              <div key={article.id}>
                <h1 className="font-bold text-3xl">{article.title}</h1>
                <div className="flex flex-col sm:flex-row gap-2 text-slate-500 mb-4">
                  <span>Oleh {article.author}</span>
                  <span>
                    pada {dayjs(article.createdAt).format("dddd, D MMMM YYYY")}
                  </span>
                </div>
                <div className="space-y-10">
                  <img
                    src={article.image}
                    alt="Article pilihan 1"
                    className="w-full"
                  />
                  <p className="whitespace-pre-line">{article.content}</p>
                </div>
              </div>
            ) : (
              <div>Article not found</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ArticleDetail;
