const express = require("express");
const router = express.Router();
const { validateInput, schemas } = require("../middlewares/inputValidator");
const { bookController } = require("../controllers");

router.post("/", validateInput(schemas.bookSchema), bookController.bookCreate);
router.delete("/:bookId", bookController.bookDelete);
router.patch(
  "/:bookId",
  validateInput(schemas.bookSchema),
  bookController.bookUpdate
);
router.get("/available", bookController.bookIndex);
router.get("/:bookId", bookController.bookDetail);
router.get("/", bookController.bookList);

module.exports = router;
