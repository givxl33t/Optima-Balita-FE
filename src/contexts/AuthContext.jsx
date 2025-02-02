import { axiosInstance as axios } from "../configurations/axiosInstance";
import { createContext, useEffect, useState } from "react";
import { updateUser } from "../utils/api";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (response.data.accessToken) {
        const { accessToken, refreshToken } = response.data;
        setCurrentUser(response.data);
        localStorage.setItem(
          "token",
          JSON.stringify({ accessToken, refreshToken }),
        );
        await getUserProfile();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };
  const logout = async () => {
    try {
      await axios.delete(`${API_URL}/logout`, {
        data: {
          refreshToken,
        },
      });

      localStorage.removeItem("token");
      setCurrentUser(null);
      setRefreshToken(null);
    } catch (error) {
      console.error("Error during logout:", error);

      localStorage.removeItem("token");
      setCurrentUser(null);
      setRefreshToken(null);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });

      return response;
    } catch (error) {
      console.error("Error during registration:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw new Error(error.message);
      }
    }
  };

  const updateProfile = async (updateData) => {
    try {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        throw new Error("No token found");
      }

      if (updateData.profile === null) {
        delete updateData.profile;
      }

      if (updateData.password === "" || updateData.current_password === "") {
        delete updateData.password;
        delete updateData.current_password;
      }

      const formData = new FormData();

      Object.entries(updateData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await updateUser(formData);
      await getUserProfile();

      return response;
    } catch (error) {
      console.error("Error updating profile", error);
      throw error;
    }
  };

  const getUserProfile = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        const { refreshToken: storedRefreshToken } =
          JSON.parse(storedToken);

        if (storedRefreshToken) {
          setRefreshToken(storedRefreshToken);

          const response = await axios.get(`${API_URL}/me`);

          if (response.data) {
            const { email, username, profile } = response.data.data;
            setCurrentUser({ email, username, profile });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);

      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("Non-response error:", error.message);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserProfile = async () => {
      if (token) {
        const { email, username, profile } = JSON.parse(token);
        setCurrentUser({ email, username, profile });
        try {
          await getUserProfile();
        } catch (error) {
          console.error("Error fetching user profile:", error);
          await logout();
        }
      }
      setCheckingUser(false);
    };

    if (token) {
      const refreshTimer = setTimeout(async () => {
        try {
          await fetchUserProfile();
        } catch (refreshError) {
          console.error("Error during token refresh:", refreshError);
          await logout();
        }
      });

      fetchUserProfile();

      return () => clearTimeout(refreshTimer);
    } else {
      setCheckingUser(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        updateProfile,
      }}
    >
      {!checkingUser && children}
    </AuthContext.Provider>
  );
};
