const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/authController");
const { validateSignup, validateSignin } = require("../middleware/validation");

// POST /auth/signup
router.post("/signup", validateSignup, signup);

// POST /auth/signin
router.post("/signin", validateSignin, signin);

module.exports = router;
