const winston = require("winston");
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${
        process.env.DB_PASSWORD
      }@leeio-iflkr.mongodb.net/${process.env.DB_NAME}?retryWrites=true`,
      { useNewUrlParser: true }
    )
    .then(winston.info("Connected to Database"));
  //   .catch(err => {
  //     console.log(err); this is not needed with this implementation
  //   });
};
