import { createContext, useEffect, useState, useContext } from "react";
import { fetchForum } from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [forumData, setForumData] = useState({ data: [] });
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forumResponse = await fetchForum();
        setForumData(forumResponse);
      } catch (error) {
        console.error("Error fetching forum data:", error.message);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <ForumContext.Provider value={{ forumData, setForumData}}>
      {children}
    </ForumContext.Provider>
  );
};
