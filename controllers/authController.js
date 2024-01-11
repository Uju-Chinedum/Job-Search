const { StatusCodes } = require("http-status-codes");

const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const Job = require("../models/Job");
const { BadRequest } = require("../errors");
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
      username: customer.username,
      email: customer.email,
    },
  });
};

const registerJob = async (req, res) => {
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    job: {
      fullName: job.fullName,
      email: job.email,
      occupation: job.occupation,
      phone: job.phone,
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
    login(res, Admin, email, password);
  } else if (mode === "customer") {
    login(res, Customer, email, password);
  } else if (mode === "job") {
    login(res, Job, email, password);
  }
};

const logout = async (req, res) => {
  req.get("Authorization").replace("Bearer ", "");
  res.status(StatusCodes.OK).json({ msg: "Logged out successfully" });
};

module.exports = {
  registerAdmin,
  registerCustomer,
  registerJob,
  loginMode,
  logout,
};
