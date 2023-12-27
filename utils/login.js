const { Unauthenticated } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const login = async (res, model, password) => {
  const document = await model
    .findOne({ email })
    .select("-password -confirmPassword");
  if (!document) {
    throw new Unauthenticated(
      "Invalid Credentials",
      `No ${model.toLowerCase()} found with email: ${email}`
    );
  }

  const isPassword = await model.comparePassword(password);
  if (!isPassword) {
    throw new Unauthenticated("Invalid Credentials", "Incorrect password");
  }

  const payload = {
    userId: document._id,
    email: document.email,
    role: document.role,
  };
  const token = createJWT({ payload });

  res.status(StatusCodes.OK).json({
    message: "User logged in successfully",
    user: {
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
    },
    token,
  });
};

module.exports = login;
