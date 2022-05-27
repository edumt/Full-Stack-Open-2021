const logger = require("./logger");
const morgan = require("morgan");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

morgan.token("sent-data", function (req) {
  if (req.method === "POST") return JSON.stringify(req.body);
});

/* eslint-disable */
const requestLogger =
  process.env.NODE_ENV !== "test"
    ? morgan(
        ":method :url :status :res[content-length] - :response-time ms :sent-data"
      )
    : (req, res, next) => next();
/* eslint-enable */

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);

  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    request.user = await User.findById(decodedToken.id);
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
