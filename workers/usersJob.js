"use strict";
var User = require("../models/User");
module.exports = async (job, done) => {
  try {
    let data = job.data;
    User.findOne({ email: data.email })
      .then((usuario) => {
        if (usuario) return done(new Error("El correo ingresado ya existe"));
        var create_user = new User();
        create_user.nombre = data.nombre;
        create_user.edad = data.edad;
        create_user.email = data.email;
        create_user.password = data.password;
        create_user
          .save()
          .then((result) => {
            job.progress(100);
            return done(null, result);
          })
          .catch((error) => {
            console.log(error);
            return done(error);
          });
      })
      .catch((error) => {
        console.error(error);
        return done(error);
      });
  } catch (error) {
    return done(error);
  }
};
