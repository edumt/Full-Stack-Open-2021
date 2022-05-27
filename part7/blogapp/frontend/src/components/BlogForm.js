import { useState } from "react";

const BlogForm = ({ handleBlogCreation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={(e) => handleBlogCreation(e, { title, author, url })}>
        <div>
          title:
          <input
            id="blog-title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          author:
          <input
            id="blog-author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          url:
          <input
            id="blog-url"
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button id="createBlog-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
