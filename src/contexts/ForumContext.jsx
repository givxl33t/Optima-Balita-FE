import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchForum } from "../utils/api";

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [forumData, setForumData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const forumResponse = await fetchForum(token);
        console.log("Forum Response:", forumResponse);
        setForumData(forumResponse);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forum data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ForumContext.Provider value={{ forumData, setForumData, loading }}>
      {children}
    </ForumContext.Provider>
  );
};
