const winston = require("winston");
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      `mongodb+srv://leeio:${
        process.env.DB_PASSWORD
      }@leeio-iflkr.mongodb.net/leeio?retryWrites=true`
      // `mongodb+srv://leeio:
      //   eaX7dvOPTUWNW9D0
      // @leeio-iflkr.mongodb.net/leeio?retryWrites=true`, //${process.env.DB_USER} //${process.env.DB_PASSWORD} // ${process.env.DB_NAME}
      // { useNewUrlParser: true }
      // "mongodb://localhost/leeio"
    )
    .then(winston.info("Connected to Database"));
  //   .catch(err => {
  //     console.log(err); this is not needed with this implementation
  //   });
};
