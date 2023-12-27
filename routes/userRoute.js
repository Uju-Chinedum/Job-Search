const express = require("express");

const {
  getAllCustomers,
  getAllJobs,
  getSingleJob,
  showCurrentUser,
  updateUser,
  updatePassword,
  deleteUser,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const router = express.Router();

router
  .route("/customer")
  .get(authenticateUser, authorizePermissions("admin"), getAllCustomers);
router.route("/job").get(authenticateUser, getAllJobs);

router.route("/show-me").get(authenticateUser, showCurrentUser);
router.route("/update-user").patch(authenticateUser, updateUser);
router.route("/update-password").patch(authenticateUser, updatePassword);

router.route("/delete-user").delete(authenticateUser, deleteUser);

router.route("/:id").get(authenticateUser, getSingleJob);

module.exports = router;
