const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.ObjectId, ref: "Book", required: true }, // Reference to the associated book.
  user: { type: Schema.ObjectId, ref: "User" },
  to: { type: Schema.ObjectId, ref: "User" },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Reading"],
    default: "Available"
  }
});

// Virtual for this bookinstance object's URL.
BookInstanceSchema.virtual("url").get(function() {
  return "/catalog/bookinstance/" + this._id;
});

// Export model.
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
