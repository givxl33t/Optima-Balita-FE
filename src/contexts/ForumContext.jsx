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

  return (
    <ForumContext.Provider
      value={{
        forums,
        isLoading,
        handlePostDiscussion,
        handleReplyPost,
        postNewComment,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};
