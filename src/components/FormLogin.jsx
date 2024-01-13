import { useState, useContext } from "react";
import Swal from "sweetalert2";
import imgSide from "../assets/img/icon_bg.png";
import imgBg from "../assets/bg-logreg.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { PersonCircle, Eye, EyeSlash, LockFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
  const error = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    navigate("/");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const success = await login(email, password);

    if (success) {
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        handleLoginSuccess();
      });
      console.log("Login successful");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Periksa email dan password yang anda masukan",
      });
      console.log("Login failed");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-around min-h-screen font-sans">
      <div className="w-full max-w-md flex overflow-hidden">
        <div className="w-full p-8">
          <h1 className=" text-center pb-16 text-2xl font-bold text-black">
            Silahkan login untuk melanjutkan!
          </h1>
          <div className="text-center mb-8"></div>
          <div className="flex pb-8">
            <NavLink
              to="/login"
              className="text-3xl font-bold flex-1 pl-10 underline"
              style={{ color: "rgba(17, 118, 143, 255)" }}
            >
              Masuk
            </NavLink>
            <NavLink
              to="/register"
              className="text-3xl font-bold flex-1 opacity-50"
              style={{ color: "rgba(17, 118, 143, 255)" }}
            >
              Daftar
            </NavLink>
          </div>
          <form onSubmit={handleLogin} className="px-0">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-6 pb-4">
              <div
                className="flex items-center bg-white rounded-full p-2 pl-4 shadow-lg"
                style={{
                  boxShadow: "-4px 4px 6px 0px rgba(200,235,229,255)",
                }}
              >
                <div className="mr-3 text-gray-400">
                  <PersonCircle color="rgba(17, 118, 143, 255)" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email kamu"
                  required
                />
              </div>
            </div>
            <div className="mb-6 pb-4">
              <div
                className="flex items-center bg-white rounded-full p-2 pl-4 shadow-lg"
                style={{
                  boxShadow: "-4px 4px 6px 0px rgba(200,235,229,255)",
                }}
              >
                <div className="mr-3 text-gray-400">
                  <LockFill color="rgba(17, 118, 143, 255)" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full bg-transparent focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                />
                <div
                  className="cursor-pointer"
                  onClick={toggleShowPassword}
                  style={{ padding: "4px" }}
                >
                  {showPassword ? (
                    <EyeSlash color="rgba(17, 118, 143, 255)" />
                  ) : (
                    <Eye color="rgba(17, 118, 143, 255)" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex pb-4">
              <h2
                className="text-1xl font-bold text-gray-800 flex-1"
                style={{ color: "#377389" }}
              >
                Lupa password?
              </h2>
              <button
                type="submit"
                className="w-full text-white font-bold py-1 px-3 rounded-full flex-1"
                style={{ backgroundColor: "rgba(17, 118, 143, 255)" }}
                onMouseOver={(e) => { e.target.style.backgroundColor = "rgba(86, 118, 143, 255)"}}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "rgba(17, 118, 143, 255)";
                }}
              >
                Masuk
              </button>
            </div>
            <p className="text-center text-gray-800 mb-4">
              Belum punya akun?{" "}
              <NavLink
                to="/register"
                className="text-1xl font-bold text-gray-800"
                style={{ color: "#377389" }}
              >
                Daftar
              </NavLink>{" "}
              atau <br></br>
              <NavLink
                to="/"
                className="text-1xl font-bold text-gray-800"
                style={{ color: "#377389" }}
              >
                Kembali ke halaman utama
              </NavLink>
            </p>
          </form>
        </div>
      </div>
      <div className="w-full max-w-md flex bg-none overflow-hidden">
        <div className="w-full mx-auto md:mr-0">
          <img src={imgSide} alt="Side Image" className="w-full" />
        </div>
      </div>
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imgBg})`, zIndex: "-1" }}
      ></div>
    </div>
  );
};

export default LoginForm;
