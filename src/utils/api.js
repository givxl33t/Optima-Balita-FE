import { axiosInstance as axios } from "../configurations/axiosInstance";

const apiUrl = `${import.meta.env.VITE_API_URL}/auth`;

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
    console.error("Error during registration:", error);
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
  const url = `${import.meta.env.VITE_API_URL}/auth`;
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

export const updateUser = async (updateData) => {
  try {
    const response = await axios.put(
      `${apiUrl}/profile`,
      updateData,
    );

    console.log("User berhasil diupdate:", response.data);
    return response.data;
  } catch (error) {
    console.error("Gagal mengupdate user:", error);
    throw error;
  }
};
export async function fetchArticles(page = 1, limit = 4) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/article?limit=${limit}&page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data = await response.json();
  return data;
}

export async function fetchArticlesRandom() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/article?limit=5&page=1&sort=RANDOM`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data = await response.json();
  return data;
}

export async function fetchArticlesSlug(articleSlug) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/article/slug/${articleSlug}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch article with slug ${articleSlug}. Status: ${response.status}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

const BASE_URL = `${import.meta.env.VITE_API_URL}/forum`;

export const fetchForum = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}?option=WITHCOMMENT`,
      { cache: 'no-store' },
    )

    return response.data;
  } catch (error) {
    console.error("Failed to fetch forum discussions:", error);
  }
};

export const fetchLandingPageForum = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/landing`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch forum discussions:", error);
  }
};

export const postDiscussion = async (discussion, currentUser, setForumData) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        ...discussion,
        userId: currentUser.userId,
      },
    );

    setForumData((prevData) => ({
      ...prevData,
      data: [response.data, ...prevData.data],
      error: false,
    }));

    return response.data; // Mengembalikan data diskusi yang baru ditambahkan
  } catch (error) {
    console.error("Failed to post discussion:", error.message);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
    }
    throw new Error("Failed to post discussion");
  }
};

export const postComment = async (discussionId, comment) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${discussionId}/comment`,
      comment
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to post comment");
  }
};

export const handleUpdateDiscussion = async (
  discussionId,
  updatedDiscussion,
  setForumData,
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${discussionId}`,
      updatedDiscussion,
    );

    const updatedDiscussionFromAPI = response.data;

    setForumData((prevData) => ({
      data: Array.isArray(prevData?.data)
        ? {
            data: prevData.data.map((discussion) =>
              discussion.id === discussionId
                ? updatedDiscussionFromAPI
                : discussion,
            ),
          }
        : { data: [] },
    }));
  } catch (error) {
    console.error("Failed to update discussion:", error.message);
  }
};

export const handleUpdateComment = async (
  commentId,
  updatedComment,
  setForumData,
) => {
  try {
    await axios.put(
      `${BASE_URL}/comment/${commentId}`,
      {
        comment_content: updatedComment,
      },
    );

    const forumResponse = await fetchForum();
    setForumData(forumResponse);
  } catch (error) {
    console.error("Failed to update comment:", error.message);
  }
};

export const handleLikeUnlikeDiscussion = async (discussionId, setForumData) => {
  try {
    await axios.post(
      `${BASE_URL}/${discussionId}/like`,
    );
    const forumResponse = await fetchForum();
    setForumData(forumResponse);
  } catch (error) {
    console.error("Failed to like discussion:", error.message);
  }
};

export const deleteDiscussion = async (discussionId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${discussionId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete discussion");
  }
};

export const handleDeleteDiscussion = async (discussionId) => {
  try {
    await deleteDiscussion(discussionId);
  } catch (error) {
    console.error("Failed to delete discussion:", error.message);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/comment/${commentId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete comment");
  }
};

export const handleDeleteComment = async (
  commentId,
  setForumData,
) => {
  try {
    await deleteComment(commentId);
    // Remove the comment from the state
    const forumResponse = await fetchForum();
    setForumData(forumResponse);
  } catch (error) {
    console.error("Failed to delete comment:", error.message);
  }
};

export const handlePostComment = async (
  discussionId,
  newComment,
  setForumData,
) => {
  try {
    await axios.post(
      `${BASE_URL}/${discussionId}/comment`,
      { comment_content: newComment },
    );

    const forumResponse = await fetchForum();
    setForumData(forumResponse);
  } catch (error) {
    console.error("Failed to post comment:", error.message);
  }
};

export const fetchConsultants = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/consultation/consultant`);
    return response.data;
  } catch (error) {
    console.error("Gagal mendapatkan data konsultan:", error);
    throw error;
  }
};
