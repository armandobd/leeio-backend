const express = require("express");
const router = express.Router();
const { validateInput, schemas } = require("../middlewares/inputValidator");
const validateObjectId = require("../middlewares/validateObjectId");
//controllers
const genreController = require("../controllers/genreController");

//routes
router.post(
  "/",
  validateInput(schemas.genreSchema),
  genreController.genreCreate
);
router.delete("/:genreId", genreController.genreDelete);
router.patch(
  "/:genreId",
  validateInput(schemas.genreSchema),
  genreController.genreUpdate
);
router.get("/:genreId", validateObjectId, genreController.genreDetail);
router.get("/", genreController.genreList);

module.exports = router;
