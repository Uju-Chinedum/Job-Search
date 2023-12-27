const { Unauthenticated } = require("../errors");

const login = async (model, password) => {
  const document = await model.findOne({ email });
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

  return;
};

module.exports = login;
