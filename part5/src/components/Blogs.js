import Blog from "./Blog";
import BlogForm from "./BlogForm";

const Blogs = ({ blogs, setBlogs, user, setUser, sendNotification }) => {
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
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        sendNotification={sendNotification}
      />
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
