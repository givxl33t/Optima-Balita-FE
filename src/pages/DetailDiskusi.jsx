import React, { useContext, useState, useEffect } from "react";
import { ForumContext } from "../contexts/ForumContext";
import { BiComment, BiLike } from "react-icons/bi";
import CommentForm from "../components/CommentForm";
import { useParams } from "react-router-dom";
import { AiOutlineWechat } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  handlePostComment,
  handleLikeDiscussion,
  handleUnlikeDiscussion,
  handleUpdateComment,
  handleDeleteComment, // Tambahkan ini
  handleDeleteDiscussion, // Tambahkan ini
} from "../utils/api";

function DetailDiskusi() {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [discussion, setDiscussion] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const { isLoading, forumData } = useContext(ForumContext);

  useEffect(() => {
    if (forumData) {
      const foundDiscussion = forumData.data.find((item) => item.id === id);
      setDiscussion(foundDiscussion);
    }
  }, [forumData, id]);
  const goBack = () => {
    window.history.back();
  };

  const sharePost = () => {
    const url = window.location.href;
    navigator.share({
      title: "Bagikan postingan ini",
      url: url,
    });
  };

  const handleLike = () => {
    handleLikeDiscussion(id);
  };

  const handleSubmitComment = () => {
    if (editingCommentId) {
      // Mengedit komentar
      handleUpdateComment(id, editingCommentId, { text: newComment });
      setEditingCommentId(null);
    } else {
      // Menambahkan komentar baru
      handlePostComment(id, newComment);
    }
    setNewComment("");
  };

  const handleDelete = () => {
    if (deletingCommentId) {
      // Menghapus komentar
      handleDeleteComment(id, deletingCommentId);
      setDeletingCommentId(null);
    } else {
      // Menghapus diskusi
      // Implement a confirmation dialog if needed
      handleDeleteDiscussion(id, setForumData);
    }
  };

  const handleEdit = () => {
    // Implement navigation to the edit page or a modal for editing
    console.log("Editing discussion:", discussion);
  };

  dayjs.extend(relativeTime);
  dayjs.locale("id");

  return (
    <>
      <Navbar />
      <div className="">
        <div className="sm:max-w-2xl w-full px-4 justify-center mx-auto mt-10">
          <div className="flex justify-between mb-4">
            <button>
              <BsChevronLeft className="text-xl" onClick={goBack} />
            </button>
            {isLoading ? (
              <p>Loading...</p>
            ) : forumData ? (
              <p className="font-semibold text-lg">
                Postingan dari{" "}
                {discussion?.poster_username || "poster_username is undefined"}
              </p>
            ) : (
              <div>Discussion not found</div>
            )}

            <button>
              <IoShareSocialOutline className="text-xl" onClick={sharePost} />
            </button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : forumData ? (
            <div key={id} className="mb-8">
              <div className="max-w-2xl border-2 border-slate-200 rounded-lg shadow-lg p-4 space-y-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={discussion?.poster_profile}
                    alt={`user profile ${id}`}
                    className="rounded-full w-16"
                  />
                  <div>
                    <p className="font-semibold text-lg">
                      {discussion?.poster_username}
                    </p>
                    <span className="text-sm text-slate-600">
                      {dayjs(discussion?.created_at).fromNow()}
                    </span>
                  </div>
                </div>

                <div>
                  <h1 className="font-semibold text-xl">{discussion?.title}</h1>
                  <p className="text-lg">{discussion?.post_content}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleLike}
                    className="text-teal-500 hover:underline mr-2"
                  >
                    <BiLike /> Like (
                    {discussion?.likes ? discussion.likes.length : 0})
                  </button>
                  <button
                    onClick={handleSubmitComment}
                    className="text-red-500 hover:underline"
                  >
                    <BiComment />{" "}
                    {forumData.comments && forumData.comments.length > 0
                      ? forumData.comments.length
                      : ""}
                  </button>
                </div>

                <div>
                  {forumData.comments && forumData.comments.length > 0 ? (
                    <ul className="space-y-4">
                      <h2 className="font-medium text-md">
                        Semua komentar({forumData.comments.length})
                      </h2>
                      {forumData.comments.map((comment) => (
                        <li
                          key={comment.id}
                          className="border-t border-slate-200 pt-4"
                        >
                          <div className="flex gap-4 items-center">
                            <img
                              src={comment.userProfile}
                              alt={`user profile ${comment.id}`}
                              className="rounded-full w-12"
                            />
                            <div>
                              <p className="font-semibold text-md">
                                {comment.username}
                              </p>
                              <span className="text-sm text-slate-600">
                                {dayjs(comment.createdAt).fromNow()}
                              </span>
                              <p className="text-lg">{comment.text}</p>
                              {comment.userId === token.userId && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      setEditingCommentId(comment.id)
                                    }
                                    className="text-blue-500 hover:underline"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      setDeletingCommentId(comment.id)
                                    }
                                    className="text-red-500 hover:underline"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="justify-center text-center space-y-1 py-4">
                      <AiOutlineWechat className="w-14 h-14 text-slate-500 justify-center mx-auto" />
                      <p className="font-semibold text-lg">
                        Belum ada komentar
                      </p>
                      <span>jadilah yang pertama berkomentar</span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  {editingCommentId ? (
                    // Form untuk mengedit komentar
                    <CommentForm
                      onSubmit={handleSubmitComment}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  ) : (
                    <CommentForm
                      onSubmit={handleSubmitComment}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>Discussion not found</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailDiskusi;
