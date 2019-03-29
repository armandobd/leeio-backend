const { Book } = require("../models");

exports.bookCreate = (req, res, next) => {
  if (!(req.body.genre instanceof Array)) {
    if (typeof req.body.genre === "undefined") {
      req.body.genre = [];
    } else {
      req.body.genre = new Array(req.body.genre);
    }
  }
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      genre: req.body.genre
    });
    Book.findOne({ title: req.body.title }).exec((err, bookFound) => {
      if (err) return res.json({ err: "error1" });
      if (bookFound) {
        return res.json({ err: "A book with this name already exist" });
      } else {
        book.save(err => {
          if (err) {
            return res.status(400).json({ err: err });
          }
          res.json({ name: req.body.title });
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.bookList = (req, res, next) => {
  Book.find().exec((err, listOfBooks) => {
    if (err) {
      res.send(err);
    }
    res.json({ listOfBooks });
  });
};

exports.bookDetail = (req, res, next) => {
  try {
    Book.findById(req.params.bookId, (error, book) => {
      if (error) return next(error);
      if (book == null) {
        const err = new Error("Book not found");
        err.status = 404;
        return next(err);
      }
      res.json({ book });
    });
  } catch (error) {}
};

exports.bookUpdate = (req, res, next) => {
  if (!(req.body.genre instanceof Array)) {
    if (typeof req.body.genre === "undefined") {
      req.body.genre = [];
    } else req.body.genre = new Array(req.body.genre);
  }
  const book = new Book({
    bookToUpdate
    // genre: typeof req.body.genre === "undefinded" ? [] : req.body.genre
  });
  Book.findByIdAndUpdate(req.params.bookId, book, { new: true }, err => {
    if (err) return next(err);
    res.json({ message: "book updated" });
  });
};

exports.bookDelete = (req, res, next) => {
  Book.findByIdAndRemove(req.params.bookId, err => {
    if (err) return next(err);
    res.json({ message: "book deleted" });
  });
};
