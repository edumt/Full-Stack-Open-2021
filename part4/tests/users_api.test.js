const supertest = require("supertest");
const mongoose = require("mongoose");
// const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

// const User = require("../models/user");

describe("when creating a new user", () => {
  throw { name: "NotImplementedError", message: "too lazy to implement" };
  // test("invalid users are not created", async () => {});
  // test("invalid add user operation returns a suitable status code and error message", async () => {
  //   const invalidUser = { name: "asdf", username: "as", password: "df" };
  //   await api.post("/api/users").send(invalidUser).expect(400);
  // });
});

afterAll(() => {
  mongoose.connection.close();
});
