const express = require("express");

const {
  registerAdmin,
  registerCustomer,
  registerJob,
  login,
  logout,
} = require("../controllers/authController");
// const { validateUser } = require("../validation");
const { authenticateUser } = require("../middleware/authentication");

const router = express.Router();

router.post("/register/admin", registerAdmin);
router.post("/register/customer", registerCustomer);
router.post("/register/job", registerJob);

router.post("/login", login);
router.post("/logout", authenticateUser, logout);

// Export
module.exports = router;
