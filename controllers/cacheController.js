"use strict";
var User = require("../models/User");

function getAllUsers(req, res) {
  User.find()
    .then((users) => {
      res.status(200).send({
        status: 200,
        message: "Usuarios encontrados",
        data: users,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        status: 500,
        message: "Error detectado",
      });
    });
}

module.exports = { getAllUsers };
