const express = require("express");
const router = express.Router();
const { validateInput, schemas } = require("../middlewares/inputValidator");
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");

const userController = require("../controllers/userController");

router.post("/", validateInput(schemas.userSchema), userController.userCreate);
router.delete("/:id", validateObjectId, userController.userDelete);
router.patch(
  "/:id",
  [validateObjectId, validateInput(schemas.userSchema)],
  userController.userUpdate
);
router.get("/me", auth, validateObjectId, userController.userDetail);
router.get("/", userController.userList);

module.exports = router;
