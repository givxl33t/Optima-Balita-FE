import { useContext } from "react";
import { FaStar, FaStarHalfAlt, FaQuoteRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ForumContext } from "../../contexts/ForumContext";
import { Loader } from "../Loader";

const Forum = () => {
  const { forums, isLoading } = useContext(ForumContext);

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
      <div className="flex flex-wrap justify-center mx-16">
        {isLoading ? (
          <Loader />
        ) : (
          forums?.slice(0, 3).map((forum) => (
            <div key={forum.id} className="w-full mb-4 md:w-1/2 lg:w-1/3">
              <div className="box-lg bg-white m-2 p-2 md:m-4 md:p-4 w-auto text-center relative border-2 border-slate-400 shadow-md rounded-xl">
                <div className="user flex-col">
                  <img
                    className="mx-auto w-20 h-20 rounded-full"
                    src={forum.userProfile}
                    alt=""
                  />
                  <h3 className="text-center font-semibold">{forum.username}</h3>
                  <div className="flex items-center justify-center gap-1 py-2">
                    {[
                      ...Array(Math.min(Math.floor(forum.replies.length), 4)),
                    ].map((_, index) => (
                      <FaStar key={index} className="mr-1" />
                    ))}
                    {forum.replies % 1 !== 0 && (
                      <FaStarHalfAlt className="mr-1" />
                    )}
                  </div>
                  <div className="text-center">{forum.postContent}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center">
        <button className="py-3 px-5 text-lg bg-gradient-to-r from-teal-600 to-teal-300 rounded-full font-semibold text-white">
          <NavLink to="/login">Bergabung</NavLink>
        </button>
      </div>
    </section>
  );
};

export default Forum;
