const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024
    },
    city: {
      type: String
    },
    isAdmin: Boolean,
    isVerified: {
      type: Boolean,
      default: false
    },
    status: {
      type: Number,
      required: true,
      default: 0
    },
    bookInstances: [{ type: Schema.ObjectId, ref: "Book" }]
  },
  {
    timestamps: true
  }
);

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.jwtPrivateKey
  );
  return token;
};

userSchema.methods.generateVerificationToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email
    },
    process.env.jwtPrivateKey
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
