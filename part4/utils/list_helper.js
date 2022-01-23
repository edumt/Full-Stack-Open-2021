const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  const likesArray = blogs.map((blog) => blog.likes);
  const favoriteIndex = likesArray.indexOf(Math.max(...likesArray));

  return blogs[favoriteIndex];
};

const mostBlogs = (blogs) => {
  const authorsBlogsCount = blogs.reduce((map, blog) => {
    map[blog.author] = (map[blog.author] || 0) + 1;
    return map;
  }, {});

  const mostBlogsAuthor = Object.keys(authorsBlogsCount).reduce(
    (potentialMostBlogsAuthor, nextAuthor) =>
      authorsBlogsCount[potentialMostBlogsAuthor] >
      authorsBlogsCount[nextAuthor]
        ? potentialMostBlogsAuthor
        : nextAuthor
  );

  return { author: mostBlogsAuthor, blogs: authorsBlogsCount[mostBlogsAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
