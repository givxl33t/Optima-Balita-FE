import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { updateUser } from "../utils/api";

const API_URL = "https://www.givxl33t.site/api/auth";

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
        await getUserProfile(); // Fetch user profile after successful login
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setRefreshToken(null); // Clear refreshToken state on logout
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
        await getUserProfile(); // Fetch user profile after successful registration
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

      // Append each key-value pair in updateData to the FormData
      Object.entries(updateData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Call the updateUser function from api.js
      await updateUser(currentUser.userId, formData, { accessToken });

      // Fetch the updated user profile after the update
      await getUserProfile();

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);

      // Handle error as needed (e.g., show an error message to the user)
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
          // Handle other server errors as needed
        }
      } else {
        // Handle non-response errors
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
          await getUserProfile(); // Fetch user profile when the component mounts
        } catch (error) {
          // Handle error during initial fetch or token refresh
          console.error("Error fetching user profile:", error);
          logout();
        }
      }
      setCheckingUser(false);
    };

    if (token) {
      const { refreshToken } = JSON.parse(token);
      // Set a timer for token refresh just before it expires
      const refreshTimer = setTimeout(
        async () => {
          try {
            await refreshAccessToken();
            await fetchUserProfile();
          } catch (refreshError) {
            // Handle error during token refresh
            console.error("Error during token refresh:", refreshError);
            logout();
          }
        } /* Set the timer duration based on token expiry time */,
      );

      fetchUserProfile();

      // Clear the timer on component unmount
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
