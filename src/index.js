const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { books } = require("./routes");

// initializaton
const app = express();
app.use(helmet());

// settings
app.set("port", process.env.PORT || "3000");

// set up database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${
      process.env.DB_PASSWORD
    }@leeio-iflkr.mongodb.net/${process.env.DB_NAME}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(console.log("Connected to Database"))
  .catch(err => {
    console.log(err);
  });

// middlewares
const dev = app.get("env") !== "production";
if (!dev) {
  app.disable("x-powered-by");
  app.use(morgan("common"));
} else {
  app.use(morgan("dev"));
}
app.use(express.json());

// gloabla variables
app.use((req, res, next) => {
  next();
});

// routes
app.use("/api", books);

// starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
