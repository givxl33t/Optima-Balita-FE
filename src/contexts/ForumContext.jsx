import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { fetchForum, postDiscussion, postComment } from "../utils/api";

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const { currentUser, isLoggedIn } = useContext(AuthContext);
  const [forumData, setForumData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchForum(); // Use fetchForum instead of getUserProfile
        setForumData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, currentUser]);

  const createDiscussion = async (discussion) => {
    try {
      const data = await postDiscussion(discussion);
      setForumData((prevData) => [data, ...prevData]);
    } catch (error) {
      console.error("Failed to create discussion:", error);
    }
  };

  const addComment = async (discussionId, comment) => {
    try {
      const data = await postComment(discussionId, comment);
      setForumData((prevData) =>
        prevData.map((discussion) =>
          discussion._id === discussionId
            ? { ...discussion, comments: [...discussion.comments, data] }
            : discussion,
        ),
      );
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <ForumContext.Provider
      value={{ forumData, loading, error, createDiscussion, addComment }}
    >
      {children}
    </ForumContext.Provider>
  );
};
