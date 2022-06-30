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
    likeBlogById(state, action) {
      const likedBlog = state.find((blog) => blog.id === action.payload);
      likedBlog.likes++;
    },
  },
});

export const { setBlogs, likeBlogById } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (likedBlog) => {
  return async (dispatch) => {
    dispatch(likeBlogById(likedBlog.id));
    console.log(await blogService.updateById(likedBlog.id, likedBlog));
  };
};

export default blogSlice.reducer;
