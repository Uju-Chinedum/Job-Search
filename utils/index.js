const passwordConfirm = require("./passwordConfirm");
const { createJWT, verifyToken } = require("./jwt");
const confirmUser = require("./confirmUser");
const login = require("./login");

module.exports = {
  passwordConfirm,
  createJWT,
  verifyToken,
  confirmUser,
  login,
};
