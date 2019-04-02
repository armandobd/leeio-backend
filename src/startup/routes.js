const express = require("express");
const error = require("../middlewares/error");
const books = require("../routes/books");
const genres = require("../routes/genres");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = app => {
  app.use("/api/books", books);
  app.use("/api/genres", genres);
  app.use("/api/users", users);
  // app.use("/api/auth", auth);
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  app.use(error);
};
