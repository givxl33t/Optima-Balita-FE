import axios from "axios";
import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

const API_URL = "https://www.givxl33t.site/api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Jika ada token di local storage, maka pengguna sudah login sebelumnya
      // Ambil data pengguna dari token
      const { email, username, profile } = JSON.parse(token);
      setCurrentUser({ email, username, profile });
      // Ambil data profil pengguna saat komponen dimuat
      getUserProfile();
    }
    setCheckingUser(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (response.data) {
        // Simpan data pengguna ke dalam currentUser
        const { email, username, profile } = response.data;
        setCurrentUser({ email, username, profile });
        localStorage.setItem("token", JSON.stringify(response.data));

        // Setelah pengguna berhasil login, ambil data profil pengguna
        await getUserProfile();

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
        const { email, username, profile } = response.data;
        setCurrentUser({ email, username, profile });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Jika server memberikan pesan error, kembalikan pesan error tersebut
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        // Jika tidak ada pesan error dari server, kembalikan pesan default
        throw new Error("Registrasi Gagal. Terjadi kesalahan.");
      }
    }
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const accessToken = JSON.parse(token).accessToken;

        const response = await axios.get(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data) {
          const { email, username, profile } = response.data.data;
          setCurrentUser({ email, username, profile });
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token kadaluwarsa, maka logout pengguna
          logout();
        } else {
          console.error(error);
        }
      }
    }
  };

  const isLoggedIn = Boolean(currentUser);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        register,
        login,
        logout,
        getUserProfile,
      }}
    >
      {!checkingUser && children}
    </AuthContext.Provider>
  );
};
