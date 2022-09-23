import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentBlog } from "../redux/reducers/blogReducer";

const BlogComments = ({ blog }) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  console.log(blog);
  const handleClick = () => {
    if (!newComment) return;

    dispatch(
      commentBlog({ ...blog, comments: [...blog.comments, newComment] }),
    );
    setNewComment("");
  };

  return (
    <>
      <h2>comments</h2>
      <input
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      />
      <button onClick={handleClick}>add comment</button>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default BlogComments;
