const express = require("express");
const router = express.Router();

//controllers
const bookController = require("../controllers/bookController");

//routes
router.post("/books", bookController.bookCreate);
router.delete("/book/:id", bookController.bookDelete);
router.patch("/book/:id", bookController.bookUpdate);
router.get("/books", bookController.bookList);

module.exports = router;
