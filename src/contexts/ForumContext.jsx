// ForumContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchForum } from "../utils/api";

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [forumData, setForumData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const forumResponse = await fetchForum(token);
        console.log("Forum Response:", forumResponse); // Log the response
        setForumData(forumResponse);
      } catch (error) {
        console.error("Error fetching forum data:", error.message);
        // Handle error as needed
      }
    };

    fetchData();
  }, []);

  return (
    <ForumContext.Provider value={{ forumData, setForumData }}>
      {children}
    </ForumContext.Provider>
  );
};
