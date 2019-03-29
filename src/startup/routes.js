const express = require("express");
const error = require("../middlewares/error");
const books = require("../routes/books");
const genres = require("../routes/genres");

module.exports = app => {
  app.use("/api/books", books);
  app.use("/api/genres", genres);
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  app.use(error);
};
