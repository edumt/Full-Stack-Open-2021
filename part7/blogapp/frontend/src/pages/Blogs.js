import { useRef } from "react";
import { useDispatch } from "react-redux";
import { tempNotification } from "../redux/reducers/notificationReducer";
import { setBlogs } from "../redux/reducers/blogReducer";

import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import blogService from "../services/blogs";

const Blogs = ({ blogs, user, handleLike, handleRemove }) => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const handleBlogCreation = async (e, blog) => {
    e.preventDefault();
    try {
      const createdBlog = await blogService.create(blog);
      dispatch(setBlogs([...blogs, createdBlog]));
      dispatch(
        tempNotification({
          message: `a new blog '${createdBlog.title}' by '${createdBlog.author}' added`,
          type: "success",
        }),
      );
    } catch (error) {
      dispatch(
        tempNotification({
          message: error.response.data.error,
          type: "error",
        }),
      );
    }
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
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
