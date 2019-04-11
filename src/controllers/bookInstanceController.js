let BookInstance = require("../models/bookInstance");
let Book = require("../models/book");
let User = require("../models/user");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const asyncMiddleware = require("../middlewares/async");

exports.bookInstanceCreate = asyncMiddleware(async (req, res) => {
  let bookInstance = new BookInstance({
    book: req.body.book,
    user: req.body.user, // req.user
    status: "Available"
  });
  await Book.findByIdAndUpdate(req.body.book, {
    $inc: { bookInstance: 1 }
  });
  await User.findByIdAndUpdate(req.body.user, { $inc: { status: 1 } });
  bookInstance = await bookInstance.save();
  res.send(bookInstance);
});

exports.bookInstanceList = asyncMiddleware(async (req, res) => {
  const bookInstances = await BookInstance.find()
    .populate("book")
    .populate("user");
  res.send(bookInstances);
});

exports.bookInstanceDetail = asyncMiddleware(async (req, res) => {
  const bookInstance = await BookInstance.findById(req.params.bookInstanceId)
    .populate("book")
    .populate("user");
  if (!bookInstance)
    return res.status(404).send("The bookInstance is not in the Database");
  res.send(bookInstance);
});

exports.bookInstanceUpdate = asyncMiddleware(async (req, res) => {
  const bookInstance = await BookInstance.findByIdAndUpdate(
    req.params.bookInstanceId,
    { book: req.body.book },
    { user: req.body.user }
  );
  if (!bookInstance)
    return res.status(404).send("The book is not on the Database");
  res.send(bookInstance);
});

exports.bookInstanceDelete = asyncMiddleware(async (req, res) => {
  const { book, user } = await BookInstance.findById(req.params.bookInstanceId);
  const bookInstance = await BookInstance.findByIdAndDelete(
    req.params.bookInstanceId
  );
  if (!bookInstance)
    return res.status(404).send("The book is not on the Database");
  await Book.findByIdAndUpdate(book, { $inc: { bookInstance: -1 } });
  await User.findByIdAndUpdate(user, { $inc: { status: -1 } });
  res.send(bookInstance);
});
