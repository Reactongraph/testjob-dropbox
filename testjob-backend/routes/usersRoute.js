const usersController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();
const parser= require("body-parser").json()

router.post("/signup", parser, usersController.userSignup);
router.post("/login",parser, usersController.loginUser);

module.exports = router;