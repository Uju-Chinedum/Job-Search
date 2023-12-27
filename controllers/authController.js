const { StatusCodes } = require("http-status-codes");

const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const Job = require("../models/Job");
const { BadRequest, Unauthenticated } = require("../errors");

const registerAdmin = async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    throw new BadRequest("Incorrect Password", "Passwords do not match.");
  }

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({
    msg: "Please check your email and confirm it",
  });
};

const registerCutomer = async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    throw new BadRequest("Incorrect Password", "Passwords do not match.");
  }

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({
    msg: "Please check your email and confirm it",
  });
};

const registerJob = async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    throw new BadRequest("Incorrect Password", "Passwords do not match.");
  }

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({
    msg: "Please check your email and confirm it",
  });
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest(
      "Missing Details",
      "Please provide email and password"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthenticated(
      "Invalid Credentials",
      `No user found with email: ${email}`
    );
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new Unauthenticated("Invalid Credentials", "Incorrect password");
  }

  if (!user.isVerified) {
    throw new Unauthenticated("Not Verified", "Please verify your email");
  }

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Logout User
const logout = async (req, res) => {

  res.status(StatusCodes.OK).json({ msg: "Logged out successfully" });
};

// Export
module.exports = {
  registerAdmin,
  registerCustomer,
  registerJob,
  login,
  logout,
};
