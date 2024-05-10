const mongoose = require("mongoose");
const bcryptService = require("../services/bcryptService");

var userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcryptService
    .hashPassword(this.password)
    .then((hashedPassword) => {
      console.log(hashedPassword);
      this.password = hashedPassword;
      next();
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

const User = mongoose.model("users", userSchema);

module.exports = User;
