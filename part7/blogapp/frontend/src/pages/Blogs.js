import { useRef } from "react";
import { useDispatch } from "react-redux";
import { tempNotification } from "../redux/reducers/notificationReducer";
import { setBlogs } from "../redux/reducers/blogReducer";

import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

const Blogs = ({ blogs }) => {
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
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.name} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
