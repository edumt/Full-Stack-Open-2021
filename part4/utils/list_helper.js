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

const mostLikes = (blogs) => {
  const authorsLikesCount = blogs.reduce((map, blog) => {
    map[blog.author] = (map[blog.author] || 0) + blog.likes;
    return map;
  }, {});

  const mostLikesAuthor = Object.keys(authorsLikesCount).reduce(
    (potentialMostLikesAuthor, nextAuthor) =>
      authorsLikesCount[potentialMostLikesAuthor] >
      authorsLikesCount[nextAuthor]
        ? potentialMostLikesAuthor
        : nextAuthor
  );

  return { author: mostLikesAuthor, likes: authorsLikesCount[mostLikesAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
