require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = { userId: user._id, email: user.email };
  const token = jwt.sign(payload, process.env.KEY, { expiresIn: "1h" });
  return token;
}

module.exports = { generateToken };
