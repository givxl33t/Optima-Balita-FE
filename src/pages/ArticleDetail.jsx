// ArticleDetail.jsx

import { useContext, useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { ArticleContext } from "../contexts/ArticleContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import dayjs from "dayjs";

const ArticleDetail = () => {
  const { getArticles } = useContext(ArticleContext);
  const { articleSlug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await getArticles(articleSlug);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article detail:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchArticleDetail();
    window.scrollTo(0, 0);
  }, [getArticles, articleSlug]);

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
    { title: article?.title || "Article Detail" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
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
                hashtag="#OptimaBalita"
              >
                <WhatsappIcon size={36} round />
              </WhatsappShareButton>
            </div>
          </div>
          <div className="sm:max-w-2xl w-full px-4">
            <Breadcrumb items={breadcrumbItems} />
            {article ? (
              <div className="max-w-3xl space-y-4 mt-4">
                <h1 className="text-4xl font-semibold">{article.title}</h1>
                <p className="text-slate-500">5 menit &#10242;Ditinjau oleh {article?.author} {dayjs(article?.created_at).locale("Id").format("DD MMMM YYYY")}</p>
                <img
                  src={article.image}
                  alt={`article ${article.id}`}
                  className="sm:max-w-xl rounded-lg"
                />
                <div
                  className="prose prose-slate"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(article.content),
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-screen">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow"/>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
