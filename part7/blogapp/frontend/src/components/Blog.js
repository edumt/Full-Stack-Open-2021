import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../redux/reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const buttonLabel = isContentVisible ? "hide" : "view";
  const dispatch = useDispatch();

  const toggleVisibility = () => setIsContentVisible(!isContentVisible);

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
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      {isContentVisible && (
        <div>
          <p>{blog.url}</p>
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
      )}
    </li>
  );
};

export default Blog;
