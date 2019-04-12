const express = require("express");
const router = express.Router();
const { User, BookInstance } = require("../models");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { asyncMiddleware } = require("../middlewares");
const auth = require("../middlewares/auth");

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Invalid email or password"); //TODO: check error

    const { bookInstance, newUser } = req.body;
    const { email } = await User.findById(newUser);
    await BookInstance.findByIdAndUpdate(bookInstance, { toUser: newUser });
    res.send(email);
  })
);

router.post(
  "/:bookInstanceId",
  auth,
  asyncMiddleware(async (req, res) => {
    let bookInstance = await BookInstance.findById(req.params.bookInstanceId);
    if (!bookInstance) return res.send(400).send("Invalid request"); //TODO: check error
    const newUser = bookInstance.toUser.toString();
    if (newUser !== req.user._id)
      return res.status(400).send("Invalid request"); //TODO: check error
    bookInstance = await BookInstance.findByIdAndUpdate(
      req.params.bookInstanceId,
      { user: newUser, toUser: null },
      { new: true }
    );
    res.send(bookInstance);
  })
);

module.exports = router;
