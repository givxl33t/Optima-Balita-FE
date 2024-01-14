import axios from 'axios';
import Swal from 'sweetalert2';

export const axiosInstance = axios.create();

const refreshAccessToken = async () => {
  try {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const { refreshToken: storedRefreshToken } = JSON.parse(storedToken);

      const refreshResponse = await axios.put(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
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

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const accessToken = token?.accessToken ?? null;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const currentPath = window.location.pathname;
        if (currentPath !== '/login') {
          localStorage.removeItem('token');
          Swal.fire({
            title: 'Session Expired',
            text: 'Your session has expired. Please login again.',
            icon: 'warning',
            confirmButtonText: 'OK',
          }).then(() => {
            window.location.href = '/login';
          });
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
