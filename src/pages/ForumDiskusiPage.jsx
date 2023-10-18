import { useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { BiComment, BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { ForumContext } from "../contexts/ForumContext";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserFromApi, likeDiscussion, unlikeDiscussion } from "../utils/api";
import { FaSearch } from "react-icons/fa";

function ForumDiskusiPage() {
  const { currentUser } = useContext(AuthContext);
  const { forums, isLoading, handlePostDiscussion } = useContext(ForumContext);
  const [likedDiscussions, setLikedDiscussions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    postContent: "",
  });

  dayjs.extend(relativeTime);
  dayjs.locale("id");

  const handleSubmitDiscussion = (e) => {
    e.preventDefault();
    if (
      newDiscussion.title.trim() === "" ||
      newDiscussion.postContent.trim() === ""
    )
      return;

    const discussion = {
      title: newDiscussion.title,
      postContent: newDiscussion.postContent,
      username: currentUser.username,
      createdAt: Date.now(),
    };
    handlePostDiscussion(discussion);
    setNewDiscussion({ title: "", postContent: "" });
  };

  useEffect(() => {
    // Ambil data pengguna yang sudah melike diskusi
    getUserFromApi(currentUser.email, currentUser.password).then((user) => {
      if (user) {
        setLikedDiscussions(user.likedDiscussions || []);
      }
    });
  }, [currentUser.email, currentUser.password]);

  if (isLoading) {
    return <Loader />;
  }

  const filteredForums = forums.filter((forum) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      forum.title.toLowerCase().includes(searchTerm) ||
      forum.postContent.toLowerCase().includes(searchTerm)
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Optionally, perform the search here and update the search results state.
  };

  const handleLikeDiscussion = async (forumId) => {
    try {
      if (likedDiscussions.includes(forumId)) {
        // Jika pengguna sudah melike, panggil unlikeDiscussion
        await unlikeDiscussion(forumId);
        // Perbarui likedDiscussions dengan menghapus forumId
        setLikedDiscussions((prevLikedDiscussions) =>
          prevLikedDiscussions.filter((id) => id !== forumId),
        );
      } else {
        // Jika pengguna belum melike, panggil likeDiscussion
        await likeDiscussion(forumId);
        // Perbarui likedDiscussions dengan menambahkan forumId
        setLikedDiscussions((prevLikedDiscussions) => [
          ...prevLikedDiscussions,
          forumId,
        ]);
      }
    } catch (error) {
      console.error("Gagal mengelola like:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-10 mx-4 md:mx-32">
        <div className="max-w-2xl mx-auto">


          <div className="space-y-4 col-span-1 flex flex-col">
            <form onSubmit={handleSubmitDiscussion} className="space-y-4">
              <input
                type="text"
                placeholder="Judul Diskusi"
                className="border-2 border-gray-300 rounded-md p-2 w-full"
              />
              <textarea
                value={newDiscussion.postContent}
                onChange={(e) =>
                  setNewDiscussion({
                    ...newDiscussion,
                    postContent: e.target.value,
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
                      <form onSubmit={handleSearch} className="space-y-4 flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Diskusi"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-2 pl-10 w-full"
              />
              <div className="absolute top-2 left-2 text-gray-500">
                <FaSearch />
              </div>
            </div>
          </form>
          </div>
          <div className="forumDetail overflow-y-auto overflow-x-hidden mt-8">
            {filteredForums.map((forum) => (
              <div key={forum.id} className="mb-8">
                <div className="max-w-2xl border-2 border-slate-200 rounded-lg shadow-lg p-4 space-y-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={forum.userProfile}
                      alt={`user profile ${forum.id}`}
                      className="rounded-full w-16"
                    />
                    <div>
                      <p className="font-semibold text-lg">{forum.username}</p>
                      <span className="text-sm text-slate-600">
                        {dayjs(forum.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-semibold text-xl">{forum.title}</h1>
                    <p className="text-lg">{forum.postContent}</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLikeDiscussion(forum.id)}
                      className={`bg-gray-300 py-1 px-4 rounded-full flex items-center gap-1 ${
                        likedDiscussions.includes(forum.id)
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      <BiLike /> {forum.likes} like
                    </button>
                    <Link
                      to={`/forum/${forum.id}`}
                      className="bg-gray-300 py-1 px-4 rounded-full flex items-center gap-1"
                    >
                      <BiComment />{" "}
                      {forum.replies.length > 0 ? forum.replies.length : ""}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForumDiskusiPage;
