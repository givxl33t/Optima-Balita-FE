import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [name, setName] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  const handleUpdateProfile = () => {};

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4 flex justify-center">
        <div className="max-w-md w-full bg-white border-2 border-gray-300 p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
          <div className="mb-4">
            <label htmlFor="name" className="text-lg font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-400 rounded-md py-2 px-3 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-400 rounded-md py-2 px-3 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mr-2"
              onClick={handleUpdateProfile}
            >
              Save
            </button>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
