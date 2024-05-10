const User = require("../models/User");

function getCurrentUser(req, res) {
  new Promise((resolve, reject) => {
    const userId = req.userId;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          reject({ status: 404, message: "Usuario no encontrado" });
        } else {
          resolve(user);
        }
      })
      .catch((error) =>
        reject({
          status: 500,
          message: "Error al obtener información del usuario",
          error,
        })
      );
  })
    .then((user) => res.json(user))
    .catch((error) => {
      console.error(error);
      res.status(error.status || 500).json({ message: error.message });
    });
}

module.exports = {
  getCurrentUser,
};
