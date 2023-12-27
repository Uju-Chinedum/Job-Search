const { StatusCodes } = require("http-status-codes");

const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const Job = require("../models/Job");
const { BadRequest, Unauthenticated } = require("../errors");
const { passwordConfirm } = require("../utils");

const registerAdmin = async (req, res) => {
  const isSamePassword = passwordConfirm(
    req.body.password,
    req.body.confirmPassword
  );
  if (!isSamePassword) {
    throw new BadRequest(
      "Invalid Details",
      "password does not match confirmPassword"
    );
  }

  const admin = await Admin.create(req.body);

  res.status(StatusCodes.CREATED).json({
    admin: {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
    },
  });
};

const registerCustomer = async (req, res) => {
  const isSamePassword = passwordConfirm(
    req.body.password,
    req.body.confirmPassword
  );
  if (!isSamePassword) {
    throw new BadRequest(
      "Invalid Details",
      "password does not match confirmPassword"
    );
  }

  const customer = await Customer.create(req.body);

  res.status(StatusCodes.CREATED).json({
    customer: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
    },
  });
};

const registerJob = async (req, res) => {
  const isSamePassword = passwordConfirm(
    req.body.password,
    req.body.confirmPassword
  );
  if (!isSamePassword) {
    throw new BadRequest(
      "Invalid Details",
      "password does not match confirmPassword"
    );
  }

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    job: {
      firstName: job.firstName,
      lastName: job.lastName,
      email: job.email,
      occupation: job.occupation,
      phone: job.phone,
      whatsapp: job.whatsapp,
    },
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
