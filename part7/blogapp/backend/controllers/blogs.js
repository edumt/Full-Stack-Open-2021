const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { user, body } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user,
  });
  const savedBlog = await blog.save();
  user.blogs = [...user.blogs, savedBlog._id];
  user.save();

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
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (blog === null) return response.status(404).end();

  if (blog.user.toString() === user._id.toString()) {
    await blog.delete();
    response.status(204).end();
  } else response.status(403).end();
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const { comment } = request.body;
  if (comment) blog.comments.push(comment);
  blog.save();
  response.json(blog);
});

module.exports = blogsRouter;
