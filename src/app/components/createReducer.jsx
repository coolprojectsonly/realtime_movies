import { createSlice } from "@reduxjs/toolkit";
import { getMovies } from "./action";

const createReducer = createSlice({
  name: "post",
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getMovies.rejected, (state) => {
        state.status = "failed";
        state.error = "error";
      });
  },
});

export default createReducer;
