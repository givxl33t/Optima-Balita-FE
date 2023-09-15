export const setCurrentUser = (user) => {
  const userData = JSON.stringify(user);
  localStorage.setItem('currentUser', userData);
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

export const updateCurrentUser = (newName) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    currentUser.name = newName;
    setCurrentUser(currentUser);
  }
};

export const getUserFromLocalStorage = (userId) => {
  const userData = localStorage.getItem(userId);
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};



