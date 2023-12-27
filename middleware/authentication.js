const { verifyToken } = require("../utils");
const { Unauthenticated } = require("../errors");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("Unauthorized", "Not authenticated");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId, email, role } = verifyToken(token);
    req.user = { userId, email, role };
    next();r
  } catch (error) {
    throw new Unauthenticated("Unauthorized", "Not authenticated");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized",
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {authenticateUser, authorizePermissions};
