const express = require("express");

const {
  registerAdmin,
  registerCustomer,
  registerJob,
  loginAdmin,
  loginCustomer,
  loginJob,
  logout,
} = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authentication");

const router = express.Router();

router.post("/register/admin", registerAdmin);
router.post("/register/customer", registerCustomer);
router.post("/register/job", registerJob);

router.post("/login/admin", loginAdmin);
router.post("/login/customer", loginCustomer);
router.post("/login/job", loginJob);

router.get("/logout", authenticateUser, logout);

module.exports = router;
