const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const CustomerSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
    },
  },
  { timestamps: true }
);

CustomerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = this.password;
});

CustomerSchema.methods.comparePassword = async function (candidate) {
  const isMatch = await bcrypt.compare(candidate, this.password);
  return isMatch;
};

module.exports = mongoose.model("Customer", CustomerSchema);
