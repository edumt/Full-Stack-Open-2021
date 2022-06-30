import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, setBlogs } from "./redux/reducers/blogReducer";

import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import { setUser } from "./redux/reducers/userReducer";

const App = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

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
        <Blogs
          blogs={blogs}
          user={user}
          setUser={setUser}
          handleLike={handleLike}
          handleRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default App;
