import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isUserLoading: false,
  userError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      (state.user = action.payload), (state.isUserLoading = false);
    },
    removeUser(state) {
      (state.user = null), (state.isUserLoading = false);
    },
    loadingUser(state) {
      state.isUserLoading = true;
    },
    errorUser(state, action) {
      (state.userError = action.payload), (state.isUserLoading = false);
    },
  },
});

export const { addUser, removeUser, loadingUser, errorUser } =
  userSlice.actions;

export default userSlice.reducer;
