import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const ProfilePage = () => {
  const { currentUser, logout, updateProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [profile, setProfile] = useState(currentUser?.profile || "");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showCurrPassword, setShowCurrPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Add state for the profile image

  const handleUpdateProfile = async () => {
    if (name === "") {
      setNameError("Nama tidak boleh kosong");
      return;
    }

    if (email === "") {
      setEmailError("Email tidak boleh kosong");
      return;
    }

    try {
      const updateData = {
        username: name,
        email: email,
        profile: profileImage,
        current_password: password,
        password: newPassword,
      };

      if (password !== "" && newPassword === "") {
        Swal.fire({
          icon: "error",
          title: "Password Baru Kosong",
          text: "Password baru tidak boleh kosong",
        });
        return;
      } else if (password === "" && newPassword !== "") {
        Swal.fire({
          icon: "error",
          title: "Password Lama Kosong",
          text: "Password lama tidak boleh kosong",
        });
        return;
      }

      const success = await updateProfile(updateData);

      if (success) {
        Swal.fire({
          icon: "success",
          title: "Profile Berhasil Diubah",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      if (error.response.data.message.includes("strong")) {
        Swal.fire({
          icon: "error",
          title: "Profile Gagal Diubah",
          text: "Password baru kurang kuat.",
        });
        return;
      } else if (error.response.data.message.includes("Invalid")) {
        Swal.fire({
          icon: "error",
          title: "Profile Gagal Diubah",
          text: "Password lama salah.",
        });
        return;
      } else if (error.response.data.message.includes("email")) {
        Swal.fire({
          icon: "error",
          title: "Profile Gagal Diubah",
          text: "Email tidak valid.",
        });
        return;
      } else if (error.response.data.message.includes("taken")) {
        Swal.fire({
          icon: "error",
          title: "Profile Gagal Diubah",
          text: "Email sudah digunakan.",
        });
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Profile Gagal Diubah",
          text: error.response.data.message,
        });
      }
    }
  };

  const toggleShowCurrPassword = () => {
    setShowCurrPassword(!showCurrPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Konfirmasi Logout?",
      text: "Apakah anda yakin akan logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
      }
    });
  };

  // Function to handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setProfileImage(null);
    setProfile(currentUser?.profile || ""); // Reset to the original profile image

    // Reset the input file
    const input = document.getElementById("profileImage");
    input.value = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setProfile(currentUser?.profile || ""); // Reset to the original profile image if no file selected
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4 flex justify-center">
        <div className="max-w-md w-full bg-white border-2 border-gray-300 p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Profil Anda</h1>
          <div className="mb-4">
            <label htmlFor="name" className="text-lg font-semibold mb-2">
              Nama
            </label>
            <div className="flex items-center bg-white rounded-full p-2 pl-4 shadow-lg">
              <input
                type="text"
                id="name"
                className="w-full bg-transparent focus:outline-none"
                value={name}
                placeholder="Masukkan nama baru"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {nameError && (
              <span id="nameError" className="ml-4" style={{ color: "red" }}>
                {nameError}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-lg font-semibold mb-2">
              Email
            </label>
            <div className="flex items-center bg-white rounded-full p-2 pl-4 shadow-lg">
              <input
                type="email"
                id="email"
                className="w-full bg-transparent focus:outline-none"
                value={email}
                placeholder="Masukkan email baru"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && (
              <span id="emailError" className="ml-4" style={{ color: "red" }}>
                {emailError}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="text-lg font-semibold mb-2"
            >
              Profile Image
            </label>
            <img
                src={profile}
                alt="profile"
                className="w-20 h-20 rounded-full mb-3 ml-4 object-cover"
              />
            <div className="flex items-center justify-center w-full" onDragOver={handleDragOver} onDrop={handleDrop}>
              <label htmlFor="profileImage" className="flex flex-col items-center justify-center w-full h-25 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input type="file" id="profileImage" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            {profileImage && (
              <div className="flex justify-center mt-4">
                <button
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={handleResetImage}
                >
                  Reset Image
                </button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-lg font-semibold mb-2">
              Password Lama
            </label>
            <div className="flex items-center bg-white rounded-full p-2 pl-4 shadow-lg">
              <input
                type={showCurrPassword ? "text" : "password"}
                id="password"
                className="w-full bg-transparent focus:outline-none"
                value={password}
                placeholder="Masukkan password lama"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="cursor-pointer"
                onClick={toggleShowCurrPassword}
                style={{ padding: "4px" }}
              >
                {showCurrPassword ? (
                  <EyeSlash color="rgba(17, 118, 143, 255)" />
                ) : (
                  <Eye color="rgba(17, 118, 143, 255)" />
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="text-lg font-semibold mb-2">
              Password Baru
            </label>
            <div className="flex items-center bg-white rounded-full p-2 pl-4 shadow-lg">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="w-full bg-transparent focus:outline-none"
                value={newPassword}
                placeholder="Masukkan password baru"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
                className="cursor-pointer"
                onClick={toggleShowNewPassword}
                style={{ padding: "4px" }}
              >
                {showNewPassword ? (
                  <EyeSlash color="rgba(17, 118, 143, 255)" />
                ) : (
                  <Eye color="rgba(17, 118, 143, 255)" />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="w-full text-white font-bold py-1 px-3 rounded-full flex-1"
              style={{ backgroundColor: "rgb(255, 0, 0)" }}
              onMouseOver={(e) => { e.target.style.backgroundColor = "rgb(200, 0, 0)"}}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "rgb(255, 0, 0)";
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
            <div className="w-5" />
            <button
              className="w-full text-white font-bold py-1 px-3 rounded-full flex-1"
              style={{ backgroundColor: "rgba(17, 118, 143, 255)" }}
              onMouseOver={(e) => { e.target.style.backgroundColor = "rgba(86, 118, 143, 255)"}}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "rgba(17, 118, 143, 255)";
              }}
              onClick={handleUpdateProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
