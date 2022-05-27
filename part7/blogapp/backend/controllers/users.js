const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  if (username.length < 3 || password.length < 3) {
    return response.status(400).send({
      error: "Both username and password must be at least 3 characters long.",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    blogs: [],
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

// usersRouter.put("/:id", async (request, response) => {
//   const user = request.body;

//   const updatedUser = await User.findByIdAndUpdate(request.params.id, user, {
//     runValidators: true,
//     new: true,
//   });

//   response.json(updatedUser);
// });

// usersRouter.delete("/:id", async (request, response) => {
//   await User.findByIdAndDelete(request.params.id);
//   response.status(204).end();
// });

module.exports = usersRouter;
