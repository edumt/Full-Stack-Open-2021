import Blog from "./Blog";
import BlogForm from "./BlogForm";

const Blogs = ({ blogs, setBlogs, user, setUser }) => {
  return (
    <div>
      <h2>blogs</h2>
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
      <BlogForm blogs={blogs} setBlogs={setBlogs} />
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
