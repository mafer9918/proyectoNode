const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

router.get("/", userController.getAllUsers);
router.post(
  "/",
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
  [
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty(),
  ],
  userController.updateUser
);
router.delete("/:id", userController.deleteUser);

module.exports = router;
