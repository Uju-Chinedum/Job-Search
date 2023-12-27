const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const JobSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email.",
      },
    },
    phone: {
      type: String,
      required: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: "Please provide a valid email.",
      // },
    },
    whatsapp: {
      type: String,
      required: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: "Please provide a valid email.",
      // },
    },
    occupation: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    confirmPassword: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

JobSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = this.password;
});

JobSchema.methods.comparePassword = async function (candidate) {
  const isMatch = await bcrypt.compare(candidate, this.password);
  return isMatch;
};

module.exports = mongoose.model("Job", JobSchema);
