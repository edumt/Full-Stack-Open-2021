import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const notification = useSelector((state) => state.notification);

  const handleLike = async (id, updatedBlog) => {
    const savedBlog = await blogService.updateById(id, updatedBlog);
    const updatedBlogIndex = blogs.findIndex(
      (blog) => blog.id.toString() === savedBlog.id.toString(),
    );
    const newBlogs = [...blogs];
    newBlogs[updatedBlogIndex].likes = savedBlog.likes;
    setBlogs(newBlogs);
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
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));

    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
          setBlogs={setBlogs}
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
