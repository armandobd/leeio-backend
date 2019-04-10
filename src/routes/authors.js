const express = require("express");
const router = express.Router();
const { validateInput, schemas } = require("../middlewares/inputValidator");

//controllers
const authorController = require("../controllers/authorController");

//routes
router.post(
  "/",
  validateInput(schemas.authorSchema),
  authorController.authorCreate
);
router.delete("/:authorId", authorController.authorDelete);
router.patch(
  "/:bookId",
  validateInput(schemas.authorSchema),
  authorController.authorUpdate
);
router.get("/:bookId", authorController.authorDetail);
router.get("/", authorController.authorList);

module.exports = router;
