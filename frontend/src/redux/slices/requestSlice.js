import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: () => null,
    remvoveOneRequest: (state, action) =>
      state.filter((req) => req._id !== action.payload),
  },
});

export const { addRequests, removeRequests, remvoveOneRequest } =
  requestSlice.actions;

export default requestSlice.reducer;
