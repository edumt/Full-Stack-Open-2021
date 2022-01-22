//const http = require("http");
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

morgan.token("sent-data", function (req) {
  if (req.method === "POST") return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :sent-data"
  )
);

app.use("/api/blogs", blogsRouter);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
