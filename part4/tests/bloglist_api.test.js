const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

/* test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.content);

  expect(contents).toContain("Browser can execute only Javascript");
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    content: "async/await simplifies making async calls",
    important: true,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.content);
  expect(contents).toContain("async/await simplifies making async calls");
});

test("blog without content is not added", async () => {
  const newBlog = {
    important: true,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
}); */

afterAll(() => {
  mongoose.connection.close();
});
