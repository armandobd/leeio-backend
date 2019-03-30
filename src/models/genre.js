const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    unique: true
    // validate: {
    //   validator: (v, cb) => {
    //     Genre.find({ name: v }, function(error, docs) {
    //       cb(docs.length === 0);
    //     });
    //   },
    //   message: "Genre exist"
    // }
  }
});

module.exports = mongoose.model("Genre", GenreSchema);
