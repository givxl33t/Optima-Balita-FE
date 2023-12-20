import React, { useContext, useState } from "react";
import axios from "axios"; // Import axios
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const { currentUser, logout, updateProfile, updatePassword } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Add state for the profile image

  const handleUpdateProfile = async () => {
    try {
      const updateData = {
        username: name,
        email: email,
        // Add profile image to the updateData
        profileImage,
      };

      await updateProfile(updateData);

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    try {
      await updatePassword(password, newPassword);

      alert("Password updated successfully");
    } catch (error) {
      console.error("Error updating password", error);
      alert("Failed to update password");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  // Function to handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
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
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="text-lg font-semibold mb-2"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-lg font-semibold mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-400 rounded-md py-2 px-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="text-lg font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="border border-gray-400 rounded-md py-2 px-3 w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="px-2 py-1 m-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mr-2"
              onClick={handleUpdateProfile}
            >
              Save Profile
            </button>
            <button
              className="px-2 py-1 m-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
            <button
              className="px-2 py-1 m-2 text-white bg-red-500 rounded-md hover:bg-red-600"
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
