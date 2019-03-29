const express = require("express");
const winston = require("winston");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(helmet());

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/databse")();

// const dev = app.get("env") !== "production";
// if (!dev) {
//   app.disable("x-powered-by");
//   app.use(morgan("common"));
// } else {
//   app.use(morgan("dev"));
// }

app.set("port", process.env.PORT || "3000");
app.listen(app.get("port"), () => {
  winston.info("Server on port", app.get("port"));
});
