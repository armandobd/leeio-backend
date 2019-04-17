// const express = require("express");
const { error } = require("../middlewares");
const {
  books,
  genres,
  giveBook,
  users,
  auth,
  bookInstances,
  authors
} = require("../routes");

module.exports = app => {
  app.use("/api/books", books);
  app.use("/api/genres", genres);
  app.use("/api/giveBooks", giveBook);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/bookInstances", bookInstances);
  app.use("/api/authors", authors);
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  app.use(error);
};
