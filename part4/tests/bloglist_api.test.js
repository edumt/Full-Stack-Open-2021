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

test("all blogs have an id attribute", async () => {
  const blogs = await api.get("/api/blogs");

  blogs.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test("a valid blog can be added ", async () => {
  const newBlog = helper.sampleBlog;

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("Go To Statement Considered Harmful");
});

test("a blog without likes defaults to 0", async () => {
  const newBlog = { ...helper.sampleBlog };
  delete newBlog.likes;

  const savedBlog = await api.post("/api/blogs").send(newBlog).expect(201);

  expect(savedBlog.body.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
