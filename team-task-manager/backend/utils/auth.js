const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "defaultsecret", { expiresIn: "7d" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
