import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import { initializeBlogs, setBlogs } from "./redux/reducers/blogReducer";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import User from "./pages/User";
import Users from "./pages/Users";
import { setUser } from "./redux/reducers/userReducer";
import blogService from "./services/blogs";
import userService from "./services/users";
import Header from "./components/Header";

const App = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  const viewedUserMatch = useMatch("/users/:id");
  const viewedUser = viewedUserMatch
    ? users.find((user) => user.id === viewedUserMatch.params.id)
    : null;

  const viewedBlogMatch = useMatch("/blogs/:id");
  const viewedBlog = viewedBlogMatch
    ? blogs.find((blog) => blog.id === viewedBlogMatch.params.id)
    : null;

  const handleLike = async (id, updatedBlog) => {
    const savedBlog = await blogService.updateById(id, updatedBlog);
    const updatedBlogIndex = blogs.findIndex(
      (blog) => blog.id.toString() === savedBlog.id.toString(),
    );
    const newBlogs = [...blogs];
    newBlogs[updatedBlogIndex].likes = savedBlog.likes;
    dispatch(setBlogs(newBlogs));
  };

  const handleRemove = async (blogToBeDeleted) => {
    if (
      window.confirm(
        `Remove blog "${blogToBeDeleted.title}" by ${blogToBeDeleted.author}?`,
      )
    ) {
      await blogService.deleteById(blogToBeDeleted.id);
      setBlogs(blogs.filter((blog) => blog.id !== blogToBeDeleted.id));
    }
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Header user={user} />
      <div>
        <h1 style={{ color: "green", fontStyle: "italic" }}>blogs</h1>
        <Notification notification={notification} />
        {user === null ? (
          <LoginForm setUser={setUser} />
        ) : (
          <Routes>
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={viewedUser} />} />
            <Route
              path="/blogs/:id"
              element={<Blog blog={viewedBlog} user={user} />}
            />
            <Route
              path="/*"
              element={
                <Blogs
                  blogs={blogs}
                  user={user}
                  setUser={setUser}
                  handleLike={handleLike}
                  handleRemove={handleRemove}
                />
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
