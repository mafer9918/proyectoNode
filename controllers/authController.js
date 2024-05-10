const authService = require("../services/authService");
const bcryptService = require("../services/bcryptService");
const AuthToken = require("../models/AuthToken");
const User = require("../models/User");

function login(req, res) {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Credenciales Invalidas" });
      }
      bcryptService
        .comparePassword(password, user.password)
        .then((match) => {
          if (!match) {
            return res.status(401).json({ message: "Credenciales Invalidas" });
          }
          const token = authService.generateToken(user);
          AuthToken.create({ userId: user._id, token: token })
            .then(() => {
              res.json({ token });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ message: "Error al iniciar sesion" });
            });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Error al iniciar sesion" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error al iniciar sesion" });
    });
}

function logout(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  AuthToken.findOneAndDelete({ token })
    .then((sesion) => {
      if(sesion){
        res.status(200).json({ message: "Sesión cerrada exitosamente" });
      }else{
        res.status(404).json({ message: "Ya no existe la sesión" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error al cerrar sesion" });
    });
}

module.exports = {
  login,
  logout,
};
