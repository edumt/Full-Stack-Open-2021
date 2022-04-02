import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const sendNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLike = async (id, updatedBlog) => {
    const savedBlog = await blogService.updateById(id, updatedBlog);
    const updatedBlogIndex = blogs.findIndex(
      (blog) => blog.id.toString() === savedBlog.id.toString(),
    );
    const newBlogs = [...blogs];
    newBlogs[updatedBlogIndex].likes = savedBlog.likes;
    setBlogs(newBlogs);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

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
        <LoginForm setUser={setUser} sendNotification={sendNotification} />
      ) : (
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
          sendNotification={sendNotification}
          handleLike={handleLike}
        />
      )}
    </div>
  );
};

export default App;
