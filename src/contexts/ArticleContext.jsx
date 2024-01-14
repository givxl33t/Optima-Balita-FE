import { createContext } from "react";
import {
  fetchArticles,
  fetchArticlesRandom,
  fetchArticlesSlug,
} from "../utils/api";
import { useQuery } from "react-query";

export const ArticleContext = createContext();

// eslint-disable-next-line react/prop-types
export const ArticleProvider = ({ children }) => {
  const { data: articles, isLoading } = useQuery(["articles", 1, 5], () => fetchArticles(1, 5));
  const { data: randomArticles } = useQuery(
    "randomArticles",
    fetchArticlesRandom,
    {
      staleTime: 60000,
    }
  );

  const value = {
    articles,
    isLoading,
    randomArticles,
    getArticles: fetchArticlesSlug, // Use the correct function for fetching a single article
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};
