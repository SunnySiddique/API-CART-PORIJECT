import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./features/PostSlice";

const store = configureStore({
  reducer: {
    posts: PostReducer,
  },
});

export default store;
