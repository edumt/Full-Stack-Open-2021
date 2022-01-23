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

describe("when there is initially some blogs saved", () => {
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

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    expect(titles).toContain("React patterns");
  });

  test("all blogs have an id attribute", async () => {
    const blogs = await api.get("/api/blogs");

    blogs.body.forEach((blog) => expect(blog.id).toBeDefined());
  });
  describe("addition of a new blog", () => {
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

    test("a blog without title and/or url can't be created, status 400", async () => {
      const missingTitleBlog = { ...helper.sampleBlog };
      delete missingTitleBlog.title;
      await api.post("/api/blogs").send(missingTitleBlog).expect(400);

      const missingUrlBlog = { ...helper.sampleBlog };
      delete missingUrlBlog.url;
      await api.post("/api/blogs").send(missingUrlBlog).expect(400);

      const missingTitleUrlBlog = { ...helper.sampleBlog };
      delete missingTitleUrlBlog.title;
      delete missingTitleUrlBlog.url;
      await api.post("/api/blogs").send(missingTitleUrlBlog).expect(400);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((r) => r.titles);

      expect(titles).not.toContain(blogToDelete.title);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
