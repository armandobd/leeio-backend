const express = require("express");
const router = express.Router();
const { validateInput, schemas } = require("../middlewares/inputValidator");
const { auth, admin } = require("../middlewares");

const bookInstanceController = require("../controllers/bookInstanceController");

router.post("/", auth, bookInstanceController.bookInstanceCreate);
router.delete(
  "/:bookInstanceId",
  [auth], //admin
  bookInstanceController.bookInstanceDelete
);
router.patch(
  "/:bookInstanceId",
  validateInput(schemas.bookInstanceSchema),
  bookInstanceController.bookInstanceUpdate
);
router.get("/:bookInstanceId", bookInstanceController.bookInstanceDetail);
router.get("/", bookInstanceController.bookInstanceList);

module.exports = router;
