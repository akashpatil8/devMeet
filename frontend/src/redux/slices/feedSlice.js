import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: () => null,
    removeOneFromFeed: (state, action) =>
      state.filter((user) => user._id !== action.payload),
  },
});

export const { addFeed, removeFeed, removeOneFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
