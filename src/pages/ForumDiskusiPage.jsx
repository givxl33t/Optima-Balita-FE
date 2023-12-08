// ForumDiskusiPage.jsx
import React, { useContext, useEffect } from "react";
import { ForumContext } from "../contexts/ForumContext";
import Navbar from "../components/Navbar";

const ForumDiskusiPage = () => {
  const { forumData, loading, error, createDiscussion, addComment } =
    useContext(ForumContext);

  useEffect(() => {
    // Lakukan pengambilan data atau inisialisasi lainnya jika diperlukan
  }, [forumData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>Forum Diskusi</h1>
        <button onClick={() => createDiscussion({ title: "New Discussion" })}>
          Create Discussion
        </button>
        <ul>
          {forumData.map((discussion) => (
            <li key={discussion._id}>
              <h3>{discussion.title}</h3>
              <p>{discussion.content}</p>
              <ul>
                {discussion.comments.map((comment) => (
                  <li key={comment._id}>{comment.text}</li>
                ))}
              </ul>
              <button
                onClick={() =>
                  addComment(discussion._id, { text: "New Comment" })
                }
              >
                Add Comment
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ForumDiskusiPage;
