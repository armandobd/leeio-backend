const express = require("express");
const router = express.Router();
const { validateInput, schemas } = require("../middlewares/inputValidator");

//controllers
const bookInstanceController = require("../controllers/bookInstanceController");

//routes
router.post("/", bookInstanceController.bookInstanceCreate);
router.delete("/:bookId", bookInstanceController.bookInstanceDelete);
router.patch(
  "/:bookId",
  validateInput(schemas.bookSchema),
  bookInstanceController.bookInstanceUpdate
);
router.get("/:bookId", bookInstanceController.bookInstanceDetail);
router.get("/", bookInstanceController.bookInstanceList);

module.exports = router;
