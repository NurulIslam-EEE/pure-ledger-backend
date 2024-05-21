const express = require("express");

const userController = require("./users.controller");

const router = express.Router();

router.route("/").post(userController.createUser);
router.route("/login").post(userController.loginUser);

module.exports = router;
