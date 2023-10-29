import axios from "axios";

const apiUrl = "https://www.givxl33t.site/api/auth";
const forumUrl = "https://647d55a0af98471085499e81.mockapi.io/forums";

export const getUsers = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Gagal mendapatkan data pengguna:", error);
    throw error;
  }
  s;
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

export const fetchArticles = () =>
  fetch("https://644e64ed1b4567f4d5866c65.mockapi.io/article").then(
    (response) => response.json(),
  );

export const fetchForum = () =>
  fetch("https://647d55a0af98471085499e81.mockapi.io/forums")
    .then((response) => response.json())
    .then((forums) => {
      const commentPromises = forums.map((forum) =>
        fetch(`${forumUrl}/${forum.id}/replies`).then((response) =>
          response.json(),
        ),
      );

      return Promise.all(commentPromises).then((comments) => {
        forums.forEach((forum, index) => {
          forum.replies = comments[index];
          forum.likes = 0;
        });
        return forums;
      });
    });

export const likeDiscussion = async (forumId) => {
  try {
    const response = await axios.put(`${forumUrl}/${forumId}`, {
      likes: 1,
    });
    return response.data;
  } catch (error) {
    console.log("gagal menambahkan like", error);
    throw error;
  }
};

export const unlikeDiscussion = async (forumId) => {
  try {
    const response = await axios.put(`${forumUrl}/${forumId}`, {
      likes: -1, // Decrease likes by 1
    });
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus like:", error);
    throw error;
  }
};

export const postComment = async (forumId, comment) => {
  try {
    const response = await axios.post(
      `${forumUrl}/${forumId}/replies`,
      comment,
    );
    return response.data;
  } catch (error) {
    console.error("Gagal memposting komentar:", error);
    throw error;
  }
};

export const postDiscussion = (discussion) =>
  fetch("https://647d55a0af98471085499e81.mockapi.io/forums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discussion),
  }).then((response) => response.json());

export const deleteDiscussion = (discussion) =>
  fetch("https://647d55a0af98471085499e81.mockapi.io/forums", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discussion),
  }).then((response) => response.json());
