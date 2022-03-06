import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const createdBlog = await blogService.create({ title, author, url });
      setBlogs([...blogs, createdBlog]);
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log(exception);
      alert("something went wrong");
    }
  };

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleLogin}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
