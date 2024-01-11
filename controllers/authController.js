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
      fullName: admin.fullName,
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

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Missing Details", "Please fill all fields");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Unauthenticated(
      "Invalid Credentials",
      `No admin found with email: ${email}`
    );
  }

  const isPassword = await admin.comparePassword(password);
  if (!isPassword) {
    throw new Unauthenticated("Invalid Credentials", "Incorrect password");
  }

  const payload = {
    userId: admin._id,
    email: admin.email,
    role: admin.role,
  };
  const token = createJWT({ payload });

  res.status(StatusCodes.OK).json({
    message: "Admin logged in successfully",
    user: {
      id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
    },
    token,
  });
};

const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Missing Details", "Please fill all fields");
  }

  const customer = await Customer.findOne({ email });
  if (!customer) {
    throw new Unauthenticated(
      "Invalid Credentials",
      `No customer found with email: ${email}`
    );
  }

  const isPassword = await customer.comparePassword(password);
  if (!isPassword) {
    throw new Unauthenticated("Invalid Credentials", "Incorrect password");
  }

  const payload = {
    userId: customer._id,
    email: customer.email,
    role: customer.role,
  };
  const token = createJWT({ payload });

  res.status(StatusCodes.OK).json({
    message: "Customer logged in successfully",
    user: {
      id: customer._id,
      username: customer.username,
      email: customer.email,
    },
    token,
  });
};

const loginJob = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Missing Details", "Please fill all fields");
  }

  const job = await Job.findOne({ email });
  if (!job) {
    throw new Unauthenticated(
      "Invalid Credentials",
      `No job found with email: ${email}`
    );
  }

  const isPassword = await job.comparePassword(password);
  if (!isPassword) {
    throw new Unauthenticated("Invalid Credentials", "Incorrect password");
  }

  const payload = {
    userId: job._id,
    email: job.email,
    role: job.role,
  };
  const token = createJWT({ payload });

  res.status(StatusCodes.OK).json({
    message: "Job logged in successfully",
    user: {
      fullName: job.fullName,
      email: job.email,
    },
    token,
  });
};

const logout = async (req, res) => {
  req.get("Authorization").replace("Bearer ", "");
  res.status(StatusCodes.OK).json({ msg: "Logged out successfully" });
};

module.exports = {
  registerAdmin,
  registerCustomer,
  registerJob,
  loginAdmin,
  loginCustomer,
  loginJob,
  logout,
};
