const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 255
  },
  familyName: {
    type: String,
    required: true,
    maxlength: 255
  },
  dateOfBrith: {
    type: Date
  },
  dateOfDeath: {
    type: Date
  }
});

//Virtual fro author full name
AuthorSchema.virtual("name").get(function() {
  return this.familyName + ", " + this.firstName;
});

module.exports = mongoose.model("Author", AuthorSchema);
