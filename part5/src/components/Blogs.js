import { useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blogs = ({
  blogs,
  setBlogs,
  user,
  setUser,
  sendNotification,
  handleLike,
  handleRemove,
}) => {
  const blogFormRef = useRef();
  const handleBlogCreation = async (e, blog) => {
    e.preventDefault();
    try {
      const createdBlog = await blogService.create(blog);
      setBlogs([...blogs, createdBlog]);
      sendNotification(
        `a new blog '${createdBlog.title}' by '${createdBlog.author}' added`,
        "success",
      );
    } catch (error) {
      sendNotification(error.response.data.error, "error");
    }
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <p>
        {user.name} logged-in
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogappUser");
            setUser(null);
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          sendNotification={sendNotification}
          handleBlogCreation={handleBlogCreation}
        />
      </Togglable>
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
