const Blog = ({ blog }) => {
  const style = {
    // color: 'grey',
    paddingTop: "5px",
    fontSize: "15px",
  };

  return (
    <li style={style}>
      {blog.title} | {blog.author}
    </li>
  );
};

export default Blog;
