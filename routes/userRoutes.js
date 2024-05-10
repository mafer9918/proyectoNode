const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", verifyToken, userController.findUserById);
router.post(
  "/",
  verifyToken,
  [
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty(),
  ],

  userController.createUser
);
router.put(
  "/:id",
  verifyToken,
  [
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty(),
  ],
  userController.updateUser
);
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
