// import { createContext } from "react";
// import { fetchArticles, fetchArticlesRandom } from "../utils/api";
// import { useQuery } from "react-query";

// export const ArticleContext = createContext();

// // eslint-disable-next-line react/prop-types
// export const ArticleProvider = ({ children }) => {
//   const { data: articles, isLoading } = useQuery("articles", fetchArticles);
//   const value = { articles, isLoading };

//   return (
//     <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
//   );
// };

// ArticleContext.jsx

import { createContext } from "react";
import {
  fetchArticles,
  fetchArticlesRandom,
  fetchArticlesId,
} from "../utils/api";
import { useQuery } from "react-query";

export const ArticleContext = createContext();

// eslint-disable-next-line react/prop-types
export const ArticleProvider = ({ children }) => {
  const { data: articles, isLoading } = useQuery("articles", fetchArticles);
  const { data: randomArticles } = useQuery(
    "randomArticles",
    fetchArticlesRandom,
  );

  const value = {
    articles,
    isLoading,
    randomArticles,
    getArticles: fetchArticlesId, // Use the correct function for fetching a single article
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};
