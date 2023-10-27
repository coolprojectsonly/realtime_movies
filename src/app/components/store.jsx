import { configureStore } from "@reduxjs/toolkit";
import createReducer from "./createReducer";

const store = configureStore({
  reducer: {
    post: createReducer.reducer,
  },
});

export default store;
