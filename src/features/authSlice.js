import { createSlice } from "@reduxjs/toolkit";
import { getUsers, createUser } from "../utils/api";
import {
  getUserFromApi,
  removeUserFromApi,
  updateUserInApi,
} from "../utils/api";
import {
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser,
} from "../utils/localStorage";

export const loadUser = () => {
  return async (dispatch) => {
    try {
      const currentUserId = getCurrentUser();
      if (currentUserId) {
        const response = await getUserFromApi(currentUserId);
        if (response) {
          dispatch(setUser(response));
          setCurrentUser(response.id); // Simpan ID pengguna ke dalam local storage
        } else {
          throw new Error("Invalid response");
        }
      }
    } catch (error) {
      console.error("Error loading user:", error);
      throw error;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const currentUserId = getCurrentUser();
      if (currentUserId) {
        await removeUserFromApi(currentUserId);
        clearCurrentUser();
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error removing user:", error);
      throw error;
    }
  };
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const users = await getUsers();
    const user = users.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password,
    );

    if (user) {
      dispatch(loginSuccess(user));
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    throw new Error("An error occurred while logging in");
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    await createUser(user);
    dispatch(registerSuccess());
  } catch (error) {
    dispatch(registerFailure("Terjadi kesalahan saat melakukan register"));
  }
};

export const updateUserProfile = (userId, updatedUser) => {
  return async (dispatch) => {
    try {
      await updateUserInApi(userId, updatedUser);
      dispatch(authSlice.actions.updateUserProfile(updatedUser));
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };
};

const initialState = {
  user: getCurrentUser(),
  loggedIn: false,
  userProfile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
      // state.userProfile = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
      // state.userProfile = null;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
      // state.userProfile = action.payload;
    },
    register: (state, action) => {
      state.user = action.payload;
    },
    // updateUserProfile: (state, action) => {
    //   // state.userProfile = action.payload;
    // },
  },
});

export const { setUser, logout, login, register } = authSlice.actions;
export default authSlice.reducer;
