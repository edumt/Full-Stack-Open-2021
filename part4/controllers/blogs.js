const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.likes) request.body.likes = 0;
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
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
