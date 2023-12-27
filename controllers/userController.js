const { StatusCodes } = require("http-status-codes");

const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const Job = require("../models/Job");
const { NotFound, BadRequest, Unauthenticated } = require("../errors");

const selection =
  "-password -confirmPassword -__v";

const getAllCustomers = async (req, res) => {
  const { sort, search } = req.query;
  const queryObject = { isVerified: true };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = User.find(queryObject).select(selection);

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
  const users = await result;

  const totalUsers = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalUsers / limit);

  res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages });
};

const getAllJobs = async (req, res) => {
  const { sort, search } = req.query;
  const queryObject = { isVerified: true };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = User.find(queryObject).select(selection);

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
  const users = await result;

  const totalUsers = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalUsers / limit);

  res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select(selection);
  if (!user) {
    throw new NotFound(
      "User Not Found",
      `No user found with id: ${req.params.id}`
    );
  }

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const me = await User.findOne({ _id: req.user.userId }).select(selection);

  res.status(StatusCodes.OK).json({ user: me });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email, school, matNo } = req.body;

  res.status(StatusCodes.OK).json({ user: tokenUser });
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
  getSingleUser,
  showCurrentUser,
  updateUser,
  updatePassword,
  deleteUser,
};
