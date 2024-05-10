require("dotenv").config();
const mongoose = require("mongoose");
const mongoURL = process.env.MONGOURL;

function connectDB() {
  return new Promise((res, rej) => {
    mongoose
      .connect(mongoURL)
      .then(() => {
        console.log("Conexión a la DB establecida correctamente");
        res();
      })
      .catch((err) => {
        console.error("Error al conectar a la DB ", err);
        rej(err);
      });
  });
}

module.exports = connectDB;
