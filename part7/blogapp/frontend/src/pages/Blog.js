import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../redux/reducers/blogReducer";

const Blog = ({ blog, user }) => {
  if (!blog) return null;

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <li style={blogStyle}>
      {blog.title} | {blog.author}{" "}
      <div>
        <p>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </p>
        <p>
          likes <span className="blog-likes">{blog.likes}</span>{" "}
          <button
            onClick={() =>
              dispatch(
                likeBlog({
                  id: blog.id,
                  title: blog.title,
                  author: blog.author,
                  url: blog.url,
                  name: blog.name,
                  likes: blog.likes + 1,
                }),
              )
            }
          >
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.username === user.username && (
          <p>
            <button onClick={() => dispatch(removeBlog(blog.id))}>
              remove
            </button>
          </p>
        )}
      </div>
    </li>
  );
};

export default Blog;
