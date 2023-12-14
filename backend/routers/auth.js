const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const validator = require("../middlewares/validator");
const register = require("../validations/register");
const login = require("../validations/login");

router.post("/register", validator(register), authController.register);
router.post("/login", validator(login), authController.login);

module.exports = router;
