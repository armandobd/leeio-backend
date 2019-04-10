let BookInstance = require("../models/bookInstance");
let Book = require("../models/book");
let User = require("../models/user");

exports.bookInstanceCreate = (req, res, next) => {
  try {
    const bookInstance = new BookInstance({
      book: req.body.book,
      user: req.user
    });
  } catch (error) {}
};

exports.bookInstanceDelete = () => {};

exports.bookInstanceUpdate = () => {};

exports.bookInstanceDetail = () => {};

exports.bookInstanceList = async function(res, req, next) {
  const listBookInstances = await BookInstance.find()
    .populate("book")
    .populate("user");
  if (!listBookInstances) return res.status(400).send("error");
  res.send({});
};
