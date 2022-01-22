const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  const likesArray = blogs.map((blog) => blog.likes);
  const favoriteIndex = likesArray.indexOf(Math.max(...likesArray));

  return blogs[favoriteIndex];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};