import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(_, action) {
      const blogs = action.payload.sort((a, b) => b.likes - a.likes);
      return blogs;
    },
  },
});

export const { setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
