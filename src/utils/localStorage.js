export const setCurrentUser = (user) => {
  localStorage.setItem("token", JSON.stringify(user));
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem("token");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const clearCurrentUser = () => {
  localStorage.removeItem("token");
};

export const updateCurrentUser = (newName) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    currentUser.username = newName;
    setCurrentUser(currentUser);
  }
};

export const getUserFromLocalStorage = (userId) => {
  // Tidak ada perubahan yang diperlukan karena ini berhubungan dengan pengguna yang tersimpan dalam "localStorage"
  const userData = localStorage.getItem(userId);
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};