const { validationResult } = require("express-validator");
const {usersJob} = require("../workers/queues");
var User = require("../models/User");

function getAllUsers(req, res) {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al obtener usuarios");
    });
}

function createUser(req, res) {
  const errors = validationResult(req);
  var data = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  usersJob.add(data);
  return res.status(200).send({status: 200, message: "Usuario recibido"});
}

function updateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const userId = req.params.id;
  const updateUser = req.body;
  User.findByIdAndUpdate(userId, updateUser, { new: true })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al actualizar el usuario");
    });
}

function deleteUser(req, res) {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then(() => res.status(200).send({ message: "Usuario eliminado" }))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al eliminar el usuario");
    });
}

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
