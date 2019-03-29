const { Genre } = require("../models");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const asyncMiddleware = require("../middlewares/async");

exports.genreCreate = asyncMiddleware(async (req, res) => {
  // Genre.findOne({ genre: req.body.genre }).exec((err, genreFound) => {
  //   if (err) return res.json({ err });
  //   if (genreFound) {
  //     return res.json({ err: "This genre already exist" });
  //   } else {
  //     genre.save(err => {
  //       if (err) return res.status(400).json({ err });
  //       res.json({ genre: req.body.genre });
  //     });
  //   }
  // });
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

exports.genreList = async (req, res, next) => {
  // const genres = await Genre.find()
  //   .sort([["genre", "ascending"]])
  //   .exec((err, listOfGenres) => {
  //     if (err) return next(err);
  //     res.json({ listOfGenres });
  //   });

  try {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  } catch (error) {
    next(error);
  }
};

exports.genreDetail = async (req, res, next) => {
  // Genre.findById(req.params.genreId).exec((err, genre) => {
  //   if (err) return next(err);
  //   res.json({ genre });
  // });7
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("The genre is not on the Database");

  res.send(genre);
};

exports.genreUpdate = async (req, res, next) => {
  // const genreToUpdate = new Genre({
  //   genre: req.body.genre,
  //   _id: req.params.genreId
  // });
  // Genre.findByIdAndUpdate(
  //   req.params.genreId,
  //   genreToUpdate,
  //   { new: true },
  //   (err, genreUpdated) => {
  //     if (err) return next(err);
  //     // ToDo: muestra el genre anterior en la base de datos
  //     res.json({ genre: genreUpdated });
  //   }
  // );
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("The genre is not on the Database");

  res.send(gerne);
};

exports.genreDelete = async (req, res, next) => {
  // Genre.findOneAndDelete({ _id: req.params.genreId }, err => {
  //   // ToDo: doesn't show error
  //   if (err) return res.json({ err });
  //   res.json({ message: "genre deleted" });
  // });
  const genre = await Genre.findByIdAndRemove(req.params.genreId);

  if (!genre) return res.status(404).send("The genre is not on the Database");

  res.send(genre);
};
