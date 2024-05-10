require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization;
    if (!token) {
      reject({
        status: 401,
        message: "Token de autenticación no proporcionado",
      });
    }
    jwt.verify(token.split(" ")[1], process.env.KEY, (error, decodedToken) => {
      if (error) {
        reject({ status: 401, message: "Token de autenticación no válido" });
      } else {
        req.userId = decodedToken.userId;
        resolve();
      }
    });
  })
    .then(() => next())
    .catch((error) => {
      res.status(error.status || 500).json({ message: error.message });
    });
}

module.exports = verifyToken;
