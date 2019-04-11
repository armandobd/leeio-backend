const express = require("express");
const router = express.Router();
const { validateInput, schemas } = require("../middlewares/inputValidator");
const { auth, validateObjectId } = require("../middlewares");

const userController = require("../controllers/userController");

router.post(
  "/",
  validateInput(schemas.userSchema),
  userController.userRegister
);
router.delete("/:id", auth, userController.userDelete);
router.patch(
  "/:id",
  auth,
  validateInput(schemas.userSchema),
  userController.userUpdate
);
router.get("/me", auth, userController.userProfile);
router.get("/:userId", auth, userController.userDetail);
router.get("/", auth, userController.userList);

module.exports = router;
