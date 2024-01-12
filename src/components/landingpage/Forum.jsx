import { useContext, useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ForumContext } from "../../contexts/ForumContext";
import { fetchForum } from "../../utils/api";

const Forum = () => {
  const { forumData, loading, setForumData } = useContext(ForumContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forumResponse = await fetchForum();
        console.log("Forum Response:", forumResponse);
        setForumData(forumResponse);
      } catch (error) {
        console.error("Error fetching forum data:", error.message);
      }
    };

    fetchData();
  }, [setForumData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const limitedForumData = Array.isArray(forumData?.data)
    ? forumData.data.slice(0, 3)
    : [];

  return (
    <section>
      <div className="py-10 flex flex-col items-center justify-center mx-4">
        <h4 className="font-bold mb-2 md:text-3xl text-xl text-center text-teal-600">
          Forum Diskusi Stunting
        </h4>
        <p className="md:max-w-2xl max-w-full text-center md:text-lg text-base text-slate-800">
          Forum diskusi terbukti dapat membantu mencari solusi penanganan
          stunting, jika anda tau lebih banyak mengenai stunting bergabunglah
          bersama kami
        </p>
      </div>

      <div className="flex justify-center">
        {limitedForumData.map((discussion) => (
          <div
            key={discussion.id}
            className="w-full mb-4 md:w-1/3 md:ml-2 md:mr-2 lg:w-1/3"
          >
            <div className="box-lg bg-white m-2 p-2 md:m-4 md:p-4 w-auto text-center relative border-2 border-slate-400 shadow-md rounded-xl">
              <div className="user flex-col">
                <img
                  src={discussion.poster_profile}
                  alt={`user profile ${discussion.id}`}
                  className="mx-auto w-20 h-20 rounded-full"
                />
                <h3 className="text-center font-semibold">
                  {discussion.poster_username}
                </h3>
              </div>
              <div className="text-center">{discussion.post_content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="py-3 px-5 text-lg bg-gradient-to-r from-teal-600 to-teal-300 rounded-full font-semibold text-white">
          <NavLink to="/forum">Bergabung</NavLink>
        </button>
      </div>
    </section>
  );
};

export default Forum;
