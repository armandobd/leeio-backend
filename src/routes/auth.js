const express = require("express");
const router = express.Router();
const { User } = require("../models");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { asyncMiddleware } = require("../middlewares");

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    if (!user.isVerified) return res.status(401).send("Account not verified");

    // const token = jwt.sign({ _id: user._id }, process.env.jwtPrivateKey); //alternative to use config
    const token = user.generateAuthToken();
    res.send(token);
  })
);

module.exports = router;
