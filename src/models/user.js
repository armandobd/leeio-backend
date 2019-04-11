const mongoose = require("mongoose");
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
    status: {
      type: Number,
      required: true,
      default: 0
    }
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

module.exports = mongoose.model("User", userSchema);
