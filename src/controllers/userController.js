const { User, VerificationToken } = require("../models");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const nodemailer = require("nodemailer");
const handlebars = require("nodemailer-express-handlebars");
const { asyncMiddleware } = require("../middlewares");

exports.userRegister = asyncMiddleware(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // const link = user.generateVerificationToken();
  const link = cryptoRandomString(100);
  const verificationToken = new VerificationToken({
    user: user._id,
    token: link
  });
  await verificationToken.save();
  const transponter = nodemailer.createTransport({
    service: "Sendgrid",
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  transponter.use(
    "compile",
    handlebars({
      viewEngine: {
        //"express-handlebars"
        extName: ".hbs",
        partialsDir: "./src/templates",
        layoutsDir: "./src/templates"
        // defaultLayout: "email.body.hbs"
      },
      viewPath: "./src/templates/"
    })
  );
  const mailOptions = {
    from: "no-reply@leeio.com",
    to: user.email,
    subject: "Account Verification Token",
    text:
      "clik in the link to verify the account http//" +
      req.headers.host +
      "/api/users/confirmation/" +
      verificationToken.token,
    template: "verificationEmail"
  };
  const mail = await transponter.sendMail(mailOptions); //TODO: check callback function  function (err) {if (err) { return res.status(500).send({ msg: err.message }); } res.status(200).send('A verification email has been sent to ' + user.email + '.');
  if (!mail) return res.status(500).send("verification mail not send");
  res.status(200).send("A verification mail was send to " + user.email);

  // const token = user.generateAuthToken();
  // res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
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

exports.emailConfirmation = asyncMiddleware(async (req, res) => {
  const token = await VerificationToken.findOne({ token: req.body.token }); //TODO: check req.body.token or req.params.token
  if (!token) return res.status(400).send("Invalid token");
  const user = await User.findOne({ _id: token.user });
  if (!user) return res.status(400).send("No user for this token");
  if (user.isVerified)
    return res.status(400).send("This user is already verified");
  user.isVerified = true;
  user.save();
  res.status(200).send("The account is verified, please login");
});

exports.emailResend = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("No user with this email"); //TODO: check send this message
  const link = cryptoRandomString(100);
  const verificationToken = new VerificationToken({
    user: user._id,
    token: link
  });
  await verificationToken.save();
  const transponter = nodemailer.createTransport({
    service: "Sendgrid",
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  // TODO: use templates email
  const mailOptions = {
    from: "no-reply@leeio.com",
    to: user.email, //TODO: req.body.email?
    subject: "Account Verification Token",
    text:
      "clik in the link to verify the account http//" +
      req.headers.host +
      "/api/users/confirmation/" +
      verificationToken.token
  };
  const mail = await transponter.sendMail(mailOptions); //TODO: check callback function  function (err) {if (err) { return res.status(500).send({ msg: err.message }); } res.status(200).send('A verification email has been sent to ' + user.email + '.');
  if (!mail) return res.status(500).send("verification mail not send");
  res.status(200).send("A verification mail was send to " + user.email);
});
