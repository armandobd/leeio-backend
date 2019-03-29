const express = require("express");
const router = express.Router();
const { validateInput, schemas } = require("../middlewares/inputValidator");

//controllers
const bookController = require("../controllers/bookController");

//routes
router.post("/", validateInput(schemas.bookSchema), bookController.bookCreate);
router.delete("/:bookId", bookController.bookDelete);
router.patch(
  "/:bookId",
  validateInput(schemas.bookSchema),
  bookController.bookUpdate
);
router.get("/:bookId", bookController.bookDetail);
router.get("/", bookController.bookList);

module.exports = router;
