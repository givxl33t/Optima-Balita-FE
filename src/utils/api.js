import axios from "axios";

const apiUrl = "https://www.givxl33t.site/api/auth";


export const getUsers = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Gagal mendapatkan data pengguna:", error);
    throw error;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, user);
    return response.data;
  } catch (error) {
    console.error("Gagal mendaftar pengguna:", error);
    throw error;
  }
};

export const createUser = async (user) => {
  const response = await axios.post(apiUrl, user);
  return response.data;
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Gagal mendapatkan data pengguna:", error);
    throw error;
  }
};

export const saveUserToApi = async (user) => {
  try {
    const response = await axios.post(apiUrl, user);
    console.log("User berhasil disimpan:", response.data);
    return response.data;
  } catch (error) {
    console.error("Gagal menyimpan user:", error);
    throw error;
  }
};

export const getUserFromApi = (email, password) => {
  const url = "https://www.givxl33t.site/api/auth";
  return axios.get(url).then((response) => {
    const users = response.data;

    for (let user of users) {
      if (user.email === email && user.password === password) {
        return user;
      }
    }

    return null;
  });
};

export const removeUserFromApi = async () => {
  try {
    const response = await axios.delete(apiUrl);
    console.log("User berhasil dihapus");
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus user:", error);
    throw error;
  }
};

export const updateUserInApi = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`${apiUrl}/${userId}`, updatedUser);
    console.log("User berhasil diupdate:", response.data);
    return response.data;
  } catch (error) {
    console.error("Gagal mengupdate user:", error);
    throw error;
  }
};

export async function fetchArticles() {
  const response = await fetch("https://www.givxl33t.site/api/article");
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data = await response.json();
  return data;
}
export async function fetchArticlesRandom() {
  const response = await fetch(
    "https://www.givxl33t.site/api/article?limit=3&page=1&sort=RANDOM",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data = await response.json();
  return data;
}

export async function fetchArticlesId(articleId) {
  try {
    const response = await fetch(
      `https://www.givxl33t.site/api/article/${articleId}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch article with ID ${articleId}. Status: ${response.status}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle other errors
    console.error("Error fetching article:", error);
    throw error;
  }
}

const BASE_URL = "https://www.givxl33t.site/api/forum";

export const fetchForum = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}?option=WITHCOMMENT`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch forum discussions:", error);
    throw new Error(
      `Failed to fetch forum discussions. Error: ${error.message}`,
    );
  }
};

export const postDiscussion = async (discussion) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(BASE_URL, discussion, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to post discussion");
  }
};

export const postComment = async (discussionId, comment) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/${discussionId}/comment`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to post comment");
  }
};