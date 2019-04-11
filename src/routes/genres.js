const express = require("express");
const router = express.Router();
const { validateInput, schemas } = require("../middlewares/inputValidator");
// const { auth, admin, validateObjectId } = require("../middlewares");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validateObjectId = require("../middlewares/validateObjectId");

const genreController = require("../controllers/genreController");

router.post(
  "/",
  [auth, validateInput(schemas.genreSchema)],
  genreController.genreCreate
);
router.delete(
  "/:genreId",
  [auth, admin, validateObjectId],
  genreController.genreDelete
);
router.patch(
  "/:genreId",
  [validateObjectId, validateInput(schemas.genreSchema)],
  genreController.genreUpdate
);
router.get("/:genreId", validateObjectId, genreController.genreDetail);
router.get("/", genreController.genreList);

module.exports = router;
