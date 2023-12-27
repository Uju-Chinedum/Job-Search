const { StatusCodes } = require("http-status-codes");

const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const Job = require("../models/Job");
const { BadRequest, Unauthenticated } = require("../errors");
const { passwordConfirm, login } = require("../utils");

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

const loginMode = async (req, res) => {
  const { email, password } = req.body;
  const { mode } = req.query;

  if (!email || !password) {
    throw new BadRequest(
      "Missing Details",
      "Please provide email and password"
    );
  }
  if (!mode) {
    throw new BadRequest("Missing Mode", "Please provide login mode");
  }

  if (mode === "admin") {
    login(res, Admin, password);
  } else if (mode === "customer") {
    login(res, Customer, password);
  } else if (mode === "job") {
    login(res, Job, password);
  }
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
  loginMode,
  logout,
};
