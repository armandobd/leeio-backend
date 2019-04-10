const { Author } = require("../models");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const asyncMiddleware = require("../middlewares/async");

exports.authorCreate = asyncMiddleware(async (req, res) => {
  let author = new Author({
    firstName: req.body.firstName,
    familyName: req.body.familyName
  });
  let checkAuthor = await Author.findOne({
    firstName: req.body.firstName,
    familyName: req.body.familyName
  });
  if (checkAuthor) throw new Error("This author already exist");
  author = await author.save();
  res.send(author);
});

exports.authorList = asyncMiddleware(async (req, res) => {
  const authors = await Author.find().sort("firstName");
  res.send(authors);
});

exports.authorDetail = asyncMiddleware(async (req, res) => {
  const author = await Author.findById(req.params.authorId);
  if (!author) return res.status(400).send("The author is not in the Database");
  res.send(author);
});

exports.authorUpdate = asyncMiddleware(async (req, res) => {
  const author = await Author.findByIdAndUpdate(
    req.params.authorId,
    { firstName: req.body.firstName },
    { familyName: req.body.familyName },
    { new: true }
  );
  if (!author) return res.status(404).send("The author is not in the Database");
  res.send(author);
});

exports.authorDelete = asyncMiddleware(async (req, res) => {
  const author = await Author.findByIdAndRemove(req.params.authorId);
  if (!author) return res.status(404).send("The author is not in the Database");
  res.send(author);
});
