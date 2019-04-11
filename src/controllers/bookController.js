const { Book } = require("../models");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const asyncMiddleware = require("../middlewares/async");

exports.bookCreate = asyncMiddleware(async (req, res) => {
  // if (!(req.body.genre instanceof Array)) {
  //   if (typeof req.body.genre === "undefined") {
  //     req.body.genre = [];
  //   } else {
  //     req.body.genre = new Array(req.body.genre);
  //   }
  // }
  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    genre: req.body.genre
  });
  let checkBook = await Book.findOne({
    title: req.body.title,
    author: req.body.author
  });
  if (checkBook) throw new Error("This book already exist");
  book = await book.save();
  res.send(book);
});

exports.bookList = asyncMiddleware(async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
});

exports.bookDetail = asyncMiddleware(async (req, res) => {
  const book = await Book.findById(req.params.bookId)
    .populate("author")
    .populate("genre");
  if (!book) return res.status(404).send("The book is not in the Database");
  res.send(book);
});

exports.bookIndex = asyncMiddleware(async (req, res) => {
  const books = await Book.find()
    .where("bookInstance")
    .gt(0);
  if (!books) return res.status(404).send("There are no books");
  res.send(books);
});

exports.bookUpdate = asyncMiddleware(async (req, res) => {
  // if (!(req.body.genre instanceof Array)) {
  //   if (typeof req.body.genre === "undefined") {
  //     req.body.genre = [];
  //   } else req.body.genre = new Array(req.body.genre);
  // }
  const book = await Book.findByIdAndUpdate(
    req.params.bookId,
    { title: req.body.title },
    { auhtor: req.body.author },
    { summary: req.body.body.summary },
    { genre: req.body.genre }
  );
  if (!book) return res.status(404).send("The book is not in the Database");
  res.send(book);
});

exports.bookDelete = asyncMiddleware(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.bookId);
  if (!book) return res.status(404).send("The book is not in the Database");
  res.send(book);
});
