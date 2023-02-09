const usersController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

router.post("/signup", usersController.userSignup);
router.post("/login", usersController.loginUser);

module.exports = router;