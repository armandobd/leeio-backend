const { Genre } = require("../models");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const asyncMiddleware = require("../middlewares/async");

exports.genreCreate = asyncMiddleware(async (req, res) => {
  let genre = new Genre({ name: req.body.name });
  let checkGenre = await Genre.findOne({ name: req.body.name });
  if (checkGenre) throw new Error("This genre already exist");
  genre = await genre.save();
  res.send(genre);
});

exports.genreList = asyncMiddleware(async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

exports.genreDetail = asyncMiddleware(async (req, res) => {
  const genre = await Genre.findById(req.params.genreId);
  if (!genre) return res.status(404).send("The genre is not on the Database");
  // if (!genre) throw new Error("The genre is not on the Database");
  res.send(genre);
});

exports.genreUpdate = asyncMiddleware(async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  // if (!genre) return res.status(404).send("The genre is not on the Database");
  if (!genre) throw new Error("The genere is not on the Database");
  res.send(gerne);
});

exports.genreDelete = asyncMiddleware(async (req, res, next) => {
  const genre = await Genre.findByIdAndRemove(req.params.genreId);
  // if (!genre) return res.status(404).send("The genre is not on the Database");
  if (!genre) throw new Error("The genre is not on the Database");
  res.send(genre);
});
