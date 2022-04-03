import { useState } from "react";
const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const buttonLabel = isContentVisible ? "hide" : "view";

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
            likes {blog.likes}{" "}
            <button
              onClick={() =>
                handleLike(blog.id, {
                  title: blog.title,
                  author: blog.author,
                  url: blog.url,
                  likes: blog.likes + 1,
                })
              }
            >
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username && (
            <p>
              <button onClick={() => handleRemove(blog)}>remove</button>
            </p>
          )}
        </div>
      )}
    </li>
  );
};

export default Blog;
