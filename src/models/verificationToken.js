const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verificationTokenSchema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 43200,
    required: true
  }
});

module.exports = mongoose.model("verificationToken", verificationTokenSchema);
