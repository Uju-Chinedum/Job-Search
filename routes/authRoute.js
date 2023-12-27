const express = require("express");

const {
  registerAdmin,
  registerCustomer,
  registerJob,
  loginMode,
  logout,
} = require("../controllers/authController");
// const { validateUser } = require("../validation");
const { authenticateUser } = require("../middleware/authentication");

const router = express.Router();

router.post("/register/admin", registerAdmin);
router.post("/register/customer", registerCustomer);
router.post("/register/job", registerJob);

router.post("/login", loginMode);
router.get("/logout", authenticateUser, logout);

module.exports = router;
