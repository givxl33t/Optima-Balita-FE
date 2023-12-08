// ForumDiskusiPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { ForumContext } from "../contexts/ForumContext";
import { postDiscussion, postComment } from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ForumDiskusiPage = () => {
  const { forumData, setForumData, isLoading } = useContext(ForumContext);
  const [newDiscussion, setNewDiscussion] = useState({ title: "", body: "" });

  useEffect(() => {
    console.log("Forum Data:", forumData);
  }, [forumData]);

  const handlePostDiscussion = async () => {
    try {
      const response = await postDiscussion(newDiscussion);
      setForumData((prevData) => [...prevData, response]);
      setNewDiscussion({ title: "", body: "" }); // Clear the form
    } catch (error) {
      console.error("Failed to post discussion:", error.message);
    }
  };

  const handlePostComment = async (discussionId, comment) => {
    try {
      const newComment = await postComment(discussionId, comment);
      setForumData((prevData) => {
        return prevData.map((discussion) => {
          if (discussion.id === discussionId) {
            return {
              ...discussion,
              comments: [...discussion.comments, newComment],
            };
          }
          return discussion;
        });
      });
    } catch (error) {
      console.error("Failed to post comment:", error.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="pt-10 mx-4 md:mx-32">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4 col-span-1 flex flex-col">
            <form onSubmit={handlePostDiscussion} className="space-y-4">
              <input
                type="text"
                placeholder="Judul Diskusi"
                className="border-2 border-gray-300 rounded-md p-2 w-full"
                value={newDiscussion.title}
                onChange={(e) =>
                  setNewDiscussion({ ...newDiscussion, title: e.target.value })
                }
              />
              <textarea
                value={newDiscussion.post_content}
                onChange={(e) =>
                  setNewDiscussion({
                    ...newDiscussion,
                    post_content: e.target.value,
                  })
                }
                placeholder="Pertanyaan atau tanggapan kamu"
                className="border-2 border-gray-300 rounded-md p-2 w-full"
                rows={4}
              />
              <button
                type="submit"
                className="bg-teal-500 text-white py-1 px-4 mt-2 rounded-md float-right"
              >
                Post Discussion
              </button>
            </form>

            {Array.isArray(forumData.data) ? (
              forumData.data.map((discussion) => (
                <div key={discussion.id}>
                  <div className="max-w-2xl border-2 border-slate-200 rounded-lg shadow-lg p-4 space-y-4">
                    <div className="flex gap-4 items-center">
                      <img
                        src={discussion.poster_profile}
                        alt={`user profile ${discussion.id}`}
                        className="rounded-full w-16"
                      />
                      <div>
                        <p>{discussion.poster_username}</p>
                        <p>{discussion.created_at}</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="font-semibold text-xl">
                        {discussion.title}
                      </h1>
                      <p className="text-lg">{discussion.post_content}</p>
                    </div>
                  </div>
                  <ul>
                    {discussion.comments.map((comment) => (
                      <li key={comment.id}>{comment.text}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>Loading or no data available.</p>
            )}

            {/* Example: Button to post a new comment */}
            <button
              onClick={() => handlePostComment(1, { text: "New Comment" })}
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForumDiskusiPage;
