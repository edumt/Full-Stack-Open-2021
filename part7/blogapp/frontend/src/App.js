import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, setBlogs } from "./redux/reducers/blogReducer";
import {
  Routes,
  Route,
  useMatch,
  // Link
} from "react-router-dom";

import Blogs from "./pages/Blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import userService from "./services/users";
import { setUser } from "./redux/reducers/userReducer";
import Users from "./pages/Users";
import User from "./pages/User";

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
    <div>
      <h1 style={{ color: "green", fontStyle: "italic" }}>blogs</h1>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <>
          <p>
            {user.name} logged-in
            <button
              onClick={() => {
                window.localStorage.removeItem("loggedBlogappUser");
                dispatch(setUser(null));
              }}
            >
              logout
            </button>
          </p>

          <Routes>
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={viewedUser} />} />
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
        </>
      )}
    </div>
  );
};

export default App;
