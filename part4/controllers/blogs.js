const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  // todo: user must be supplied and correctly assigned
  const anyUser = await User.findOne({});
  body.user = anyUser._id;

  if (!body.likes) body.likes = 0;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  });
  const savedBlog = await blog.save();
  anyUser.blogs = [...anyUser.blogs, savedBlog._id];
  anyUser.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    runValidators: true,
    new: true,
  });

  response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
