const { StatusCodes } = require("http-status-codes");

const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const Job = require("../models/Job");
const { NotFound } = require("../errors");
const { createJWT } = require("../utils");

const selection = "-password -confirmPassword -__v";

const getAllCustomers = async (req, res) => {
  const { sort } = req.query;

  let result = Customer.find({}).select(selection);

  if (!sort || sort === "a-z") {
    result = result.sort("firstName");
  }
  if (sort === "z-a") {
    result = result.sort("-firstName");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const customers = await result;

  const totalCustomers = customers.length;
  const numOfPages = Math.ceil(totalCustomers / limit);

  res.status(StatusCodes.OK).json({ customers, totalCustomers, numOfPages });
};

const getAllJobs = async (req, res) => {
  const { sort, search } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = Job.find(queryObject).select(selection);

  if (sort === "a-z") {
    result = result.sort("firstName");
  }
  if (sort === "z-a") {
    result = result.sort("-firstName");
  }
  if (!sort || sort === "newest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const jobs = await result;

  const totalJobs = jobs.length;
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const getSingleJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id }).select(selection);
  if (!job) {
    throw new NotFound(
      "User Not Found",
      `No user found with id: ${req.params.id}`
    );
  }

  res.status(StatusCodes.OK).json({ job });
};

const showCurrentUser = async (req, res) => {
  const { userId } = req.user;

  const admin = await Admin.findOne({ _id: userId }).select(selection);
  if (admin) {
    return res.status(StatusCodes.OK).json({ admin });
  }

  const job = await Job.findOne({ _id: userId }).select(selection);
  if (job) {
    return res.status(StatusCodes.OK).json({ job });
  }

  const customer = await Customer.findOne({ _id: userId }).select(selection);
  if (customer) {
    return res.status(StatusCodes.OK).json({ customer });
  }

  throw new NotFound("User Not Found", `No user with id: ${userId}`);
};

const updateUser = async (req, res) => {
  const { userId } = req.user;

  const admin = await Admin.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  }).select(selection);
  if (admin) {
    const payload = {
      userId: admin._id,
      email: admin.email,
      role: admin.role,
    };
    const token = createJWT({ payload });
    return res.status(StatusCodes.OK).json({ payload, token });
  }

  const customer = await Customer.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  }).select(selection);
  if (customer) {
    const payload = {
      userId: customer._id,
      email: customer.email,
      role: customer.role,
    };
    const token = createJWT({ payload });
    return res.status(StatusCodes.OK).json({ payload, token });
  }

  const job = await Job.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  }).select(selection);
  if (job) {
    const payload = {
      userId: job._id,
      email: job.email,
      role: job.role,
    };
    const token = createJWT({ payload });
    return res.status(StatusCodes.OK).json({ payload, token });
  }

  throw new NotFound("User Not Found", `No user with id: ${userId}`);
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  res.status(StatusCodes.OK).json({ msg: "Password updated successfully" });
};

const deleteUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "User account deleted successfully" });
};

module.exports = {
  getAllCustomers,
  getAllJobs,
  getSingleJob,
  showCurrentUser,
  updateUser,
  updatePassword,
  deleteUser,
};
