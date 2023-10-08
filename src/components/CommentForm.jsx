import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
function CommentForm({ onSubmit, value, onChange }) {
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    const newComment = {
      contentReply: comments.contentReply,
    };
    setComments([...comments, newComment]);
    onSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-4 flex items-center justify-between"
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Write a comment..."
        className="bg-slate-300 py-2 px-4 rounded-full text-lg w-full"
      />
      <button type="submit">
        <IoSendSharp className="w-10 h-10 bg-teal-500 text-white p-2 rounded-full hover:bg-teal-400" />
      </button>
    </form>
  );
}

export default CommentForm;
