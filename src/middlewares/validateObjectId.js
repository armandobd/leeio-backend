const mongoose = require("mongoose");

module.exports = function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.genreId))
    return res.status(404).send("Invalid ID");
  next();
};

// module.exports.validateObjectId = validateObjectId;
