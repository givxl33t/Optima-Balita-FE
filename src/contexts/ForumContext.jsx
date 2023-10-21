import { createContext, useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetchForum, postDiscussion, postComment } from "../utils/api";
import { AuthContext } from "./AuthContext";

export const ForumContext = createContext();

// eslint-disable-next-line react/prop-types
export const ForumProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const { data: forums, isLoading } = useQuery("forums", fetchForum);

  const postNewComment = useMutation(({ forumId }) => postComment(forumId));

  const postNewDiscussion = useMutation((discussion) =>
    postDiscussion(discussion),
  );

  const handlePostDiscussion = (discussion) => {
    postNewDiscussion.mutate(discussion, {
      onSuccess: () => {
        queryClient.invalidateQueries("forums");
      },
      onError: (error) => {
        console.error("Gagal membuat diskusi baru:", error);
      },
    });
  };

  const handleReplyPost = async (forumId, newComment) => {
    if (newComment.trim() === "") return;

    try {
      const comment = {
        username: currentUser.username,
        contentReply: newComment,
        createdAt: new Date().toISOString(),
      };

      await postComment(forumId, comment);
      queryClient.invalidateQueries("forums");
    } catch (error) {
      console.error("Gagal mengirim komentar:", error);
    }
  };

const handleLikeDiscussion = async (forumId) => {
  try {
    const forum = forums.find((forum) => forum.id === forumId);

    if (!forum) {
      console.error("Forum not found");
      return;
    }

    if (forum.likes === undefined) {
      forum.likes = 0;
    }

    if (forum.likes >= 0) {
      await likeDiscussion(forumId); // Call the function to add a like
      forum.likes += 1; // Increment the number of likes
    } else {
      await unlikeDiscussion(forumId); // Call the function to remove a like
      forum.likes -= 1; // Decrement the number of likes
    }

    queryClient.invalidateQueries("forums"); // Refresh the forum data

    // You can update the state or view according to the updated number of likes
  } catch (error) {
    console.error("Failed to manage like:", error);
  }
};

return (
  <ForumContext.Provider
    value={{
      forums,
      isLoading,
      handlePostDiscussion,
      handleReplyPost,
      handleLikeDiscussion,
      postNewComment,
    }}
  >
    {children}
  </ForumContext.Provider>
);
};
