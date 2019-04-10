const express = require("express");
const winston = require("winston");
const morgan = require("morgan");

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/prod")(app);

// const dev = app.get("env") !== "production";
// if (!dev) {
//   app.disable("x-powered-by");
//   app.use(morgan("common"));
// } else {
//   app.use(morgan("dev"));
// }

app.set("port", process.env.PORT || "3000");
const server = app.listen(app.get("port"), () => {
  winston.info("Server on port", app.get("port"));
});

module.exports = server;
