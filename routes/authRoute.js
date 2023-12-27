const express = require("express");

const {
  register,
  login,
  logout,
} = require("../controllers/authController");
const { validateUser } = require("../validation");
const { authenticateUser } = require("../middleware/authentication");

// Variable Declaration
const router = express.Router();

router.post("/register/admin", register);
router.post("/register/customer", register);
router.post("/register/job", register);

router.post("/login", login);
router.post("/logout", authenticateUser, logout);

// Export
module.exports = router;
