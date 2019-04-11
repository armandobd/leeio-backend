const { User } = require("../models");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middlewares/async");

exports.userRegister = asyncMiddleware(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
});

exports.userList = asyncMiddleware(async (req, res) => {
  res.send(req.body.name);
});

exports.userProfile = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

exports.userDetail = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.params.uderId).select("-password");
  res.send(user);
});

exports.userUpdate = asyncMiddleware(async (req, res) => {
  res.send(req.body.name);
});

exports.userDelete = asyncMiddleware(async (req, res) => {
  res.send(req.body.name);
});
