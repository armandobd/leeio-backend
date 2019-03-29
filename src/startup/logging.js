const winston = require("winston");
require("winston-mongodb");
// require("express-async-errors");

module.exports = () => {
  const options = {
    logfile: {
      level: "info",
      filename: "./logs/logfile.log",
      handleExeptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    },
    errorfile: {
      level: "error",
      filename: "./logs/error.log",
      handleExeptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    },
    // db: {
    //   db: "",
    //   level: "error"
    // },
    console: {
      level: "debug",
      handleExeptions: true,
      json: false,
      colorize: true,
      prettyPrint: true,
      format: winston.format.simple()
    }
  };
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.File({
        filename: "./logs/error.log",
        level: "error"
      }),
      new winston.transports.File({ filename: "./logs/logfile.log" })
    ]
  });

  winston.exceptions.handle(
    new winston.transports.File({ filename: "./logs/uncaughtExceptions.log" })
  );
  process.on("unhandledRejection", ex => {
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex;
  });
  winston.add(new winston.transports.File(options.errorfile));
  winston.add(new winston.transports.File(options.logfile));
  // winston.add(new winston.transports.MongoDB(options.db));
  if (process.env.NODE_ENV !== "production") {
    winston.add(new winston.transports.Console(options.console));
    winston.exceptions.handle(new winston.transports.Console(options.console));
  }
};
