import axios from "axios";
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
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });

      console.log("Registration Response:", response);

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(response.data));
        const { email, username, profile } = response.data;
        setCurrentUser({ email, username, profile });
        await getUserProfile();
        return true;
      } else {
        console.error("Invalid registration response:", response.data);
        throw new Error("Registrasi Gagal. Format respons tidak sesuai.");
      }
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
      const accessToken = currentUser ? currentUser.accessToken : null;
      const formData = new FormData();

      Object.entries(updateData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await updateUser(currentUser.userId, formData, { accessToken });
      await getUserProfile();

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      throw error;
    }
  };

  const getUserProfile = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        const { accessToken, refreshToken: storedRefreshToken } =
          JSON.parse(storedToken);

        if (storedRefreshToken) {
          setRefreshToken(storedRefreshToken);

          const response = await axios.get(`${API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.data) {
            const { email, username, profile } = response.data.data;
            setCurrentUser({ email, username, profile });
            console.log("User profile fetched successfully!");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);

      if (error.response) {
        if (error.response.status === 401) {
          try {
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
              const retryResponse = await axios.get(`${API_URL}/me`, {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });

              if (retryResponse.data) {
                const { email, username, profile } = retryResponse.data.data;
                setCurrentUser({ email, username, profile });
                console.log("Token refresh successful!");
              }
            }
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            logout();
          }
        } else {
          console.error("Server error:", error.response.data);
        }
      } else {
        console.error("Non-response error:", error.message);
      }
    }
  };

  const refreshAccessToken = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        const { refreshToken: storedRefreshToken } = JSON.parse(storedToken);

        const refreshResponse = await axios.put(`${API_URL}/refresh`, {
          refreshToken: storedRefreshToken,
        });

        if (refreshResponse.data.accessToken) {
          const { accessToken, refreshToken: newRefreshToken } =
            refreshResponse.data;

          localStorage.setItem(
            "token",
            JSON.stringify({
              accessToken,
              refreshToken: newRefreshToken,
            }),
          );

          setRefreshToken(newRefreshToken);

          return accessToken;
        } else {
          console.error("Invalid refresh response:", refreshResponse.data);
          throw new Error("Invalid refresh response");
        }
      }

      return null;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
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
          logout();
        }
      }
      setCheckingUser(false);
    };

    if (token) {
      const { refreshToken } = JSON.parse(token);
      const refreshTimer = setTimeout(async () => {
        try {
          await refreshAccessToken();
          await fetchUserProfile();
        } catch (refreshError) {
          console.error("Error during token refresh:", refreshError);
          logout();
        }
      });

      fetchUserProfile();

      return () => clearTimeout(refreshTimer);
    } else {
      setCheckingUser(false);
    }
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
        refreshAccessToken,
        updateProfile,
      }}
    >
      {!checkingUser && children}
    </AuthContext.Provider>
  );
};
