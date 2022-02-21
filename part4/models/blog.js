const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: "string", required: true },
  author: String,
  url: { type: "string", required: true },
  // set default likes value to 0 here instead of doing on the controller
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
