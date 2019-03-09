const { Book } = require("../models");

exports.bookList = (req, res, next) => {
  Book.find()
    .populate("author")
    .exec((err, listOfBooks) => {
      if (err) {
        res.send(err);
      }
      res.json({ listOfBooks });
    });
};

exports.bookDetail = (req, res, next) => {};

exports.bookCreate = (req, res, next) => {};

exports.bookDelete = (req, res, next) => {};

exports.bookUpdate = (req, res, next) => {};
