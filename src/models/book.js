const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.ObjectId,
    ref: "Author",
    required: true
  },
  img: {
    type: String
  },
  summary: {
    type: String,
    required: true
  },
  genre: [
    {
      type: Schema.ObjectId,
      ref: "Genre"
    }
  ],
  bookInstance: {
    type: Number,
    default: 0
  },
  comments: [
    {
      user: {
        type: Schema.ObjectId,
        ref: "User"
      },
      text: {
        type: String,
        maxlengtth: 1000
      }
    }
  ]
});

module.exports = mongoose.model("Book", BookSchema);
