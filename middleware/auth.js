const jwt = require("jsonwebtoken");
const { Unauthenticated, UnauthenticatedError } = require("../errors");

const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authorization = req.headers.authorization;

  if (!authorization || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token Provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new Unauthenticated("Not authorized to access this route");
  }
};

module.exports = authMiddleWare;
